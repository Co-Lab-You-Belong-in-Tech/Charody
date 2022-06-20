const { Router } = require('express');
const { ObjectId } = require('mongodb');
const ListingDAO = require('../DAOs/ListingDAO');
const isAdminEmail = require('../utils/isAdminEmail.js');

//TODO add switch for production and staging URLs
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7890/api/v1' : 'https://charody-staging.herokuapp.com/api/v1';

const generateReviewPage = (userInfo, idUrl, selfieUrl) => {
  return `
    <html>
      <head>
        <script>
          const postReview = (approved) => {
            fetch("${apiUrl}/idReview/${userInfo.userId}", {
              credentials: 'include',
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ approved })
            });
          }

          const onApprove = () => {
            postReview(true)
          }

          const onDeny = () => {
            postReview(false)
          }

          const onSkip = () => {
            location.reload()
          }

          document.addEventListener('click', (e) => {
            if(e.target.matches('#approve')) {
              onApprove()
            } else if(e.target.matches('#deny')) {
              onDeny()
            } else if(e.target.matches('#skip')) {
              onSkip()
            }
          })
        </script>
      </head>
      <body>
        <h3>${userInfo.firstName} ${userInfo.lastName}</h3>
        <img src="${idUrl}" styles="width: 500px" />
        <img src="${selfieUrl}" styles="width: 500px" />
        <button id="approve">Approve</button>
        <button id="deny">Deny</button>
        <button id="skip">Skip</button>
      </body>
    </html>
  `;
};

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);
      // get random unapproved profile
      const randomUser = await ListingDAO.getRandomUnverifiedUser();
      const { firstName, lastName, userId } = randomUser;
      const userInfo = {
        userId,
        firstName,
        lastName
      };
      const idUrl = `${apiUrl}/files/id/${userId}`;
      const selfieUrl = `${apiUrl}/files/selfie/${userId}`;
      res.send(generateReviewPage(userInfo, idUrl, selfieUrl));
    } catch (error) {
      next(error);
    }
  })
  
  .post('/:userId', async (req, res, next) => {
    try {
      const { approved } = req.body;
      if(typeof approved === 'undefined') return res.sendStatus(403);
      if(!isAdminEmail(req.user.email)) return res.sendStatus(401);
      await ListingDAO.setValidVerification(new ObjectId(req.params.userId), approved);
    } catch (error) {
      next(error);
    }
  });
