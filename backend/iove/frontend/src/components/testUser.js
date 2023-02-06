const user = {
    name:'Max',
    age:25,
    email:'example@example.com',
    bigCards:{
        profilePicture:{
            image:'https://thispersondoesnotexist.com/image',
            transformX:0,
            transformY:0,
            transformScale:100
        },
        bio:'Here for a good time not a long time lmao',
        vitals:{
            orientation:'Straight',
            gender:'',
            pronouns:''
        },
        background:{
            ethnicity:{
                list:['Black', 'East Asian'],
                edits:[]
            },
            languages:{
                list:['English'],
                edits:[]
            },
            education:'High school',
            religion:'Spaghetti',
            occupation:'Milk man'
        },
        lifestyle:{
            alcohol:true,
            weed:true,
            smoke:false,
            diet:'Cum'
        },
        favoriteHobby:'winter_sports',
        code:{
            code:`print("I love poopie")`,
            filename:'poop',
            language:'Python'
        }
    },
    smallCards:{
        card_1:{id:1, theme:null, prop:'Rock'},
        card_2:{id:2, theme:'game', prop:'civ'},
        card_3:{id:3, theme:'looking_for', prop:'job'},
        card_4:{id:4, theme:'zodiac', prop:'virgo'}
    }
}

export default user;