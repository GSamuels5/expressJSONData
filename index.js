// Express app
import express, { response } from 'express';
// after installing import axious
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express()
// Router
const router = express.Router()
// Port

const port = +process.env.port || 3000
// JSON url 
const dataUrl = 'https://gsamuels5.github.io/portfolioData/Data/'
// application
app.use(
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors(),
    router
) 
// towards home
router.get('^/$|/ejd', (req,res)=>{
    res.json({
        status: res.statusCode,
        msg: "You\'re home "
    })
})
// fetch all in education
router.get('/education', async (req,res)=>{
    // always use try and catch in api
    try {
    let response = await  axios.get(dataUrl)
    let {education} = await response.data
    res.json({
        status: res.statusCode,
        education
    })
} catch (e) {
   res.json({
    status: res.statusCode,
    msg: 'Please try again later'
   }) 
}})

    router.get('/education/:id', async (req,res)=>{
        try {
            
            let response = await axios.get(dataUrl)
            let education =  response.data.education
            let params = +req.params.id
            let idx = params > 0 ? params -1 : 0
            res.json({
                status: res.statusCode,
                education: education[idx]
            })
        }catch (e) {
            res.json({
                status: res.statusCode,
                msg: 'Please try again later'
            })
        }
        }
    )

// router.post('/addEducation', async (req, res)=>{
//     let response = await axios.post(
//         dataUrl, {
//             id: idx,
//             year: new Date().getFullYear(),
//             description: ''
//         }
//     )
// })


    router.post('/addEducation',bodyParser.json(), async (req, res) => {
        try {
            let dataRes = await
            // to request data use req.body
            axios.post(dataUrl, req.body)
if (dataRes) {
    // please remove sll consoles bofore you can deploy backend
    console.log(dataRes.data);
    res.json({
        status: res.statusCode,
        msg: 'New record was added'
    })
}
    } catch (e) {
            console.log(e.message);
            res.json({
                status: res.statusCode,
                msg: 'An error occured when adding a'
            })
        }
        console.log(response.data);
    });
    
    router.patch('/updateEducation/:id', bodyParser.json(), (req, res) => {
    // axios.patch(`${dataUrl}`,)
      
    });
    
    router.delete('/deleteEducation/:id', async (req, res) => {
        try {
            const id = req.params.id;
            // Assuming your dataUrl supports deleting education entries by ID
            const response = await axios.delete(`${dataUrl}/education/${id}`);
            res.json({
                status: res.statusCode,
                message: 'Education entry deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})