import login from '../src/components/login';
import anaEkran from '../src/components/anaEkran';
import siparislerim from '../src/components/siparislerim';
import adres from '../src/components/adres';
import kullanici from '../src/components/kullanici';
import kayit from '../src/components/kayit';

export const routes = [
    {
        path : '', 
        name : 'login',
        component : login
    },
    {
        path : '/anaEkran',
        name : 'anaEkran', 
        component : anaEkran
    },
    {
        path : '/siparislerim',
        name : 'siparislerim',
        component : siparislerim
    },
    {
        path : '/adres',
        name : 'adres',
        component : adres
    },
    {
        path : '/kullanici',
        name : 'kullanici',
        component : kullanici
    },
    {
        path : '/kayit',
        name : 'kayit',
        component : kayit
    },
    {
        path : "*",
        redirect : { name : "login"}
    },
]