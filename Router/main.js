const router = require("express").Router()
const {Selectedquake, quakeDay, Lastquake} = require("../Model/get")



router.post("/selectedquake",(req,res,next)=>{

    Selectedquake(req.body).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(404)
    })
})


router.post("/quakeday",(req,res,next)=>{

    quakeDay().then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(404)
    })
})


router.post("/lastquake",(req,res,next)=>{

    Lastquake().then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(404)
    })
})




module.exports = router