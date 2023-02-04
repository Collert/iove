const loadingUser = {
    name:'Loading...',
    age:null,
    email:'example@example.com',
    bigCards:{
        profilePicture:{
            image:'load',
            transformX:0,
            transformY:0,
            transformScale:100
        },
        bio:'Here to load up your next I/Ove :)',
        vitals:{
            orientation:'Straight',
            gender:'',
            pronouns:''
        },
        background:{
            ethnicity:{
                list:['Literally a computer'],
                edits:[]
            },
            languages:{
                list:['All of them :)'],
                edits:[]
            },
            education:'The entire internet',
            religion:'Belief in cool',
            occupation:'A placeholder'
        },
        lifestyle:{
            alcohol:false,
            weed:false,
            smoke:false,
            diet:'Code'
        },
        favoriteHobby:'load',
        code:{
            code:`print(Go get em'!)`,
            filename:'lol',
            language:'Python'
        }
    },
    smallCards:{
        card_1:{id:1, theme:null, prop:'load'},
        card_2:{id:2, theme:null, prop:'load'},
        card_3:{id:3, theme:null, prop:'load'},
        card_4:{id:4, theme:null, prop:'load'}
    }
}

export default loadingUser;