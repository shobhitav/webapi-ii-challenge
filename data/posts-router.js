const express= require ('express');
//import is no longer supported so using require instead
 const router= express.Router();
 const db = require('./db.js');

 router.use(express.json());


router.get('/',(request,response) =>
    {
        db
        .find()
        .then(users => response.status(200).json(users))
        .catch(err => response.status(500).json({sucess:false,err:"There was an error while saving the post to the database"}))
    }
)  
//  get data by ID

router.get('/:id',(request,response) =>
    {
        const {id}= request.params;
        
        db 
        .findById(id)
        .then(users => response.status(200).json(users))
        .catch(err => response.status(500).json({sucess:false,err}))
    }
) 
   
router.post('/',(request,response) =>
    {
        const usersInfo = request.body;
         console.log(usersInfo);

        db 
        .insert(usersInfo)
        .then(users => response.status(201).json({sucess:true,users,message:'Sucessfully created'}))
        .catch(err => response.status(500).json({sucess:false,err}))
    } 
) 

router.put('/:id',(request,response) => {
        const {id}= request.params;
     const usersInfo = request.body;
     console.log(usersInfo);

     db.update(id,usersInfo)
        .then(updated => {
          if (updated){
        response.status(200).json({sucess:true,updated})
          }else{
             response.status(404).json({sucess:false,message:" Could not find the user you were looking for !"})
          }
        })
        .catch(err => response.status(500).json({sucess:false,err: "There was an error while saving the post to the database"}))
     
})

router.delete('/:id', (request,response) => {
        const {id}= request.params;
        db.remove(id)
        .then( deleted => {
            if (deleted){
            response.status(204).end();
            } else{
            response.status(404).json({sucess:false,message:" Could not find the user you were looking for !"})        }
        })
        .catch(err => response.status(500).json({sucess:false,err}))
    })


//  Get the comments for a given id 
    
    router.get('/:id/comments',(request,response) =>
    {
        const {id}= request.params;
        
        db 
        .findCommentById(id)
        .then(comments =>  { 
            if(comments && comments.length){
                 response.status(200).json(comments)
             } else { 
                response.status(404).json({message:'cannot find it'})
               }
            })
        .catch(err => response.status(500).json({sucess:false,err}))
    }
) 


// Find Comments by Post ID
router.get('/:id/comments/:post_id',(request,response) =>
    {
        const {id}= request.params;
        const {post_id}= request.params;
        db 
        .findPostComments(id,post_id)
        .then(comments =>  { 
            if(comments && comments.length){
                 response.status(200).json(comments)
             } else { 
                response.status(404).json({message:'cannot find it'})
               }
            })
        .catch(err => response.status(500).json({sucess:false,err}))
    }
) 


// POST (Add) comment for a given id
router.post('/:id/comments/',(request,response) =>
    {
        const {id}= request.params;
        const commentsInfo = request.body;  
        db    
        .insertComment(commentsInfo)
        .then(result => response.status(200).json(result))
        .catch(err => response.status(500).json({sucess:false,err}))
    }    
      
)   
  


// POST (Add) comment for a given id
// Creates a comment for the post with the specified id using information sent inside of the `request body`
// router.post('/:id/comments',(request,response) =>
//     {
//         const commentsInfo = request.body;
//          console.log(commentsInfo);

//         db 
//         .insertComment(commentsInfo)
//         .then(users => response.status(201).json({sucess:true,users,message:'Sucessfully created'}))
//         .catch(err => response.status(500).json({sucess:false,err}))
//     } 
// ) 
   
 

 module.exports= router;  