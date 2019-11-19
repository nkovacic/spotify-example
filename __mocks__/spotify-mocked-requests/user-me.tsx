import { UtilityHelper } from "app/services";

const id = UtilityHelper.createGuid();

export default {
    'country':'US',
    'display_name': 'Nick',
    'explicit_content':{'filter_enabled':false,'filter_locked':false},
    'external_urls':{
        'spotify': `https://open.spotify.com/user/${id}`
    },
    'followers':{'href':null,'total':0},
    'href': `https://api.spotify.com/v1/users/${id}`,
    id,
    'images':[],
    'product':'open',
    'type':'user',
    'uri': `spotify:user:${id}`})
};