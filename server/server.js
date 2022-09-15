const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app) ;

const { db } = require('./database/mongoose');
const { Concert, Performer, Seat } = require('./database/schema/concert');

const { filterByMonth, filterByCity, filterByGenre } = require('./services/filters'); 

const io = require('socket.io')(
    httpServer, 
    {
        cors:{
            methods: ["GET" , "POST"],
            origin: "http://localhost:3000",
        }
    }
);

io.on('connection' , (socket)=>{
    console.log(socket.id);
    socket.on('joinConcert' , (obj , cb)=>{
        const concertId = obj.concertId;
        socket.join(concertId);
        cb({ message: "joined the room"})
    })

    socket.on('leaveConcert' , (obj)=>{
        const concertId = obj.concertId;
        socket.leave(concertId);
        cb({ message: "left the room"})
    })

    socket.on('processSeat' , (obj, cb)=>{
        const concertId = obj.concertId;
        const row = obj.row;
        const col = obj.col;

    })

})

app.get('/' , (req , res)=>{
    res.send('vanakam');
})


app.post('/filterForPosters', 
    async(req , res)=>{
        let data = [];
        const by = req.body.by;
        const key = req.body.key;
        if(by == "month"){
            data = await filterByMonth(key) ;
        }else if(by == "genre"){
            data = await filterByGenre(key);
        }else if(by == "city"){
            data = await filterByCity(key);
        }
        if(data.length!=0)
        {
            res.send(data.map((d)=>{ 
                return ( {
                    city: d.city,
                    poster: d.poster1,
                    date: d.date,
                    likes: d.likes,
                    genre: d.genre,
                } )
            } ) ) 
        }
        else{
            res.send({ message: "no concerts" });
        }
    }   
)


app.post('/concertInfo', 
    async(req , res)=>{
        console.log('got request!!')
        const concertId = req.body.concertId;
        // const concertId = "6322e479aedc50bf59de493f";
        let data = await Concert.findById({_id : concertId});
        if(data!=null)
        {
            res.send(
                {
                    name: data.name,
                    city: data.city,
                    poster1: data.poster1,
                    poster2: data.poster2,
                    date: data.date,
                    likes: data.likes,
                    genre: data.genre,
                    month: data.month,
                    performers: data.performers,
                    venue: data.venue,
                }
            ) 
        }
        else{
            res.send({ message: "no concerts" });
        }
    }   
)



httpServer.listen(4000 , ()=>console.log('server listening to port: 4000'));



// const arr = [];
// for(let i=0 ; i<8 ; ++i){
//     const temp = [];
//     for(let j=0 ; j<10 ; ++j){
//         temp.push(new Seat({row: i, col: j, status: 'avail'}))
//     }
//     arr.push(temp)
// }

// const newConcert = new Concert({
//     name: `Rahmania`,
//     date: new Date('2022-09-21'),
//     month: 'september',
//     likes: 0,
//     genre: 'carnatic',
//     city: 'banglore',
//     venue: 'ABC auditorium',
//     poster1: 'https://wallpaperaccess.com/full/3565578.jpg',
//     poster2: 'http://www.behindwoods.com/tamil-movies-cinema-news-16/images/ar-rahman-posts-unusual-request-photos-pictures-stills.png',
//     performers: [ new Performer({ name: 'Sam', picture: 'https://i2.cinestaan.com/image-bank/1500-1500/153001-154000/153631.jpg' }) , new Performer({ name: 'Karthik', picture: 'http://starsunfolded.com/wp-content/uploads/2016/10/Shreya-Ghoshal-2.jpg' }) ],
//     seatLayout: arr,
// })

Concert.findById({_id: "6322e479aedc50bf59de493f"}).then((d)=>console.log(d))
// Concert.deleteMany({name: 'Rahmania'}).then((d)=>console.log(d))

// newConcert.save().then((res)=>console.log(res))