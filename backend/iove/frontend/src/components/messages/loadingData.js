let loadingData = 
    [
        {
            id:-1,
            person:{
                name:'Joseph',
                pfp:''
            },
            messages:[
                {
                    incoming:true,
                    text:'This is 2 min ago',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-2)
                },
                {
                    incoming:false,
                    text:'Brother this is awesome holy moly',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-20)
                },
                {
                    incoming:true,
                    text:'This is trully wacky insane holy macarolly',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-30)
                },
                {
                    incoming:false,
                    text:'I love eating nails',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-35)
                },
                {
                    incoming:false,
                    text:'Toenails are my favourite',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-37)
                },
            ]
        },
        {
            id:-1,
            person:{
                name:'Joseph',
                pfp:''
            },
            messages:[]
        },
        {
            id:-1,
            person:{
                name:'Joseph',
                pfp:''
            },
            messages:[
                {
                    incoming:true,
                    text:'This is 1 min ago',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-1)
                },
                {
                    incoming:false,
                    text:'jdnfngvedrngv wefewwefe wf wefw efwefwefwefw fwe wefw',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-20)
                },
                {
                    incoming:true,
                    text:'jdnfngvedrngv wefewwefe wf wefw efwefwefwefw fwe wefw',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-30)
                },
                {
                    incoming:false,
                    text:'jdnfngvedrngv wefewwefe wf wefw efwefwefwefw fwe wefw',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-35)
                },
                {
                    incoming:false,
                    text:'jdnfngvedrngv wefewwefe wf wefw efwefwefwefw fwe wefw',
                    timestamp: new Date().setMinutes(new Date().getMinutes()-37)
                },
            ]
        },
    ]

export default loadingData;