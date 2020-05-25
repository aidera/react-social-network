import s from "./Contact.module.sass";
import React from "react";

import githubImg from '../../../../../assets/images/github.svg';
import instagramImg from '../../../../../assets/images/instagram.svg';
import linkImg from '../../../../../assets/images/link.svg';
import facebookImg from '../../../../../assets/images/facebook.svg';
import twitterImg from '../../../../../assets/images/twitter.svg';
import vkontakteImg from '../../../../../assets/images/vkontakte.svg';
import wwwImg from '../../../../../assets/images/www.svg';
import youtubeImg from '../../../../../assets/images/youtube.svg';



const Contact = ({id, link, name}) => {

    let img;

    switch (name) {
        case 'github':
            img = githubImg;
            break;

        case 'vk':
            img = vkontakteImg;
            break;

        case 'facebook':
            img = facebookImg;
            break;

        case 'instagram':
            img = instagramImg;
            break;

        case 'twitter':
            img = twitterImg;
            break;

        case 'website':
            img = wwwImg;
            break;

        case 'youtube':
            img = youtubeImg;
            break;

       default:
            img = linkImg;
            break;

    }

    return (
        <a target='_blank' rel="noopener noreferrer" className={s.contact} key={id} href={`http://${link}`}>
            <img src={img} alt={name}/>
        </a>
    )

}

export default Contact