import React from "react";
import BigCard from "./BigCard";
import LittleCard from "./LittleCard";

export default function CardStack (props) {
    const user = props.user
    switch (props.order) {
        case 1:
            user.bigCards.profilePicture.image = 'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg'
            user.name = 1
            break
        case 2:
            user.bigCards.profilePicture.image = 'https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg'
            user.name = 2
            break
        case 3:
            user.bigCards.profilePicture.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Rhesus_macaque_%28Macaca_mulatta_mulatta%29%2C_male%2C_Gokarna.jpg/1200px-Rhesus_macaque_%28Macaca_mulatta_mulatta%29%2C_male%2C_Gokarna.jpg'
            user.name = 3
            break
        case 4:
            user.bigCards.profilePicture.image = 'https://i.guim.co.uk/img/media/027f8ffaff0788e077057ee6a5be92a2b893c54f/0_175_5247_3148/master/5247.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=436cac23ec50057585e36817d86b4661'
            user.name = 4
            break
        case 5:
            user.bigCards.profilePicture.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/220px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg'
            user.name = 5
            break
        default:
    }
    console.log(props)

    const cardStack = (
        <div className={`card-stack ${props.viewport.portrait ? 'portrait':''} ${props.editable ? 'editing' : undefined}`}>
            <LittleCard 
                editUser={props.editUser} 
                editable={props.editable} 
                cardNum={user.smallCards.card_1.id}
                theme={user.smallCards.card_1.theme} 
                specifics={user.smallCards.card_1.prop}
                user={user}
            />
            <BigCard 
                editUser={props.editUser} 
                editable={props.editable} 
                purpose='hobby' 
                hobby={user.bigCards.favoriteHobby}
                user={user}
            />
            <LittleCard 
                editUser={props.editUser} 
                editable={props.editable} 
                cardNum={user.smallCards.card_2.id}
                theme={user.smallCards.card_2.theme} 
                specifics={user.smallCards.card_2.prop}
                user={user}
            />
            <BigCard 
                editUser={props.editUser} 
                editable={props.editable} 
                purpose='code' 
                codeObj={user.bigCards.code}
                user={user}
                viewport={props.viewport}
            />
            <LittleCard 
                editUser={props.editUser} 
                editable={props.editable} 
                cardNum={user.smallCards.card_3.id}
                theme={user.smallCards.card_3.theme} 
                specifics={user.smallCards.card_3.prop}
                user={user}
            />
            <BigCard 
                editUser={props.editUser} 
                editable={props.editable} 
                purpose='bio' 
                bioText={user.bigCards.bio} 
                backgroundInfo={user.bigCards.background} 
                lifestyleInfo={user.bigCards.lifestyle}
                user={user}
            />
            <LittleCard 
                editUser={props.editUser} 
                editable={props.editable} 
                cardNum={user.smallCards.card_4.id}
                theme={user.smallCards.card_4.theme} 
                specifics={user.smallCards.card_4.prop}
                user={user}
            />
            <BigCard 
                editUser={props.editUser} 
                editable={props.editable} 
                purpose='title' 
                name={user.name} 
                age={user.age}
                profilePic={user.bigCards.profilePicture}
                user={user}
            />
        </div>
    )
    return cardStack
}