/*nations={
  "UTSR":{
    "Provinces":{"Olvka":{"units":{},"buildings":{},"capital":False,"production":{"income":0,"trillite":0,"food":0}},"Cyvias","Ero","Ludonovsk Islands","Waruinsk","Yenbyonsk","Tsarlvyo","Bronotia","Telova","Zynosk","Kyskia","Povskia","Golyansk","Vyarosk","Lynobvinsk","Linrot","Haxorus","Linmysk","Kyovsdk","Darynosky","Uzka","Restoniskivyinsk","Daioma","Memsoy","Paloia","Yerzam","Theeloskoy","Skyivinoi","Thelem Island","Nelpryvo","Zarinioi","Myvin","Trelkoi","Diapsia","Sarakyva"},
    "resources":{"money":0,"trillite":0,"food":0},
    "military":{},
    "goverment type":""
  },
  "Orgen":{"Provinces":{"Tybolk","Av' Brolta","Ardin'e","We'tara","Ter'ba","Letolind","Donland","Ro'tossia","Lurdeh","Wado","Stuta","Kiegor","Tossis","Boppo's Land","Winthrip", "Andia","Gote","Yotalia","Orgil","Pryma","Walpo","Kryossis","Delo","Tiekior","Bul'umu","Ye'brova","Eckhert","Naigos","Rytalo","Ubana","Meionis","Katoko","Tato","Ul'gor","Byakko","Aht'gur","Poalemis","Dos-dol"}},
  "Isigaku":{"Provinces":{"Jyvan","Volskoila","Sloza","Edoa","Ythemi","Myerdia","Ferutir","Hakjenmir","Edoss City","Augbje","Lekima","Olyriji","Lobos","Yjzvannir","Kyleer","Bohado","Hinzir","Isigyiji","Kumatama","Ulo","South Diapsia","Sudok","Tsazai","Lymmia","Maizale","Nyaki","Kadao","Tyaliji","Busudo","Molekai","Saruzin","Rykoliji","Solosakki"}},
  "Iahvir":{"Provinces":{"Maodaia","Balaivir","Iahvir City","Taizaki"}},
  "Hanal":{"Provinces":{"Hanal City","Voltir",""}},
  "Hollica":{"Provinces":{"Kylerza City","Tagosky","Unosiji","Carim","Felter","Pyaming","Duto","Solgrave","Tholiasberg","Brelport","Joliga","Telbro","Amhralla","Planisland","Eckoe","Rinblind","Marquesland","Ele'Kir","Thressos","Eretevia","Yer Talza","Tinbrin","Cololin","Mardina","Julan't",""}},
  "Kinosu":{"Provinces":{"Nyasori","Myojui","Hysenji","Pokaido","Hosushan","Umigaki","Jinimiji","Kylas","Suggi","Sakuro","Kinosota","Sado","Taggaki","Nomai",""}},
  "Gernalan":{"Provinces":{"Dail","Prokin","Harsol","Spaltia","Hyssia","Bodia","Pratost","Lyta","Odeil","Gulate","Hindaffo","Shitoga Island"}}
}

let water = {
  
}
*/
let nations={
  "UTSR":{
    "name":"UTSR",
    "provinces":{"Olvka":{"units":{},"buildings":{},"capital":false,"production":{"income":0,"trillite":0,"food":0},"construction":{"military":{},"buildings":{},"upgrades":{}}}},
    "resources":{"money":0,"trillite":0,"food":0,"metals":0},
    "military":{},
    "research":{},
    "govtype":"Socialist",
    "relations":{},
    "vassal":[false]
  }
}

function country_choice() {
  let c = document.getElementById("country-selection").value;
  if (Object.keys(nations).includes(document.getElementById("country-selection").value)) {
    localStorage.setItem('country', c);
    document.location.href = 'game.html';
  }
}

function diplomacy(nation) {
  let table = document.getElementById("diplo-table");
  let stuff = [];
  for (i = 0; i < Object.keys(nations).length; i++) {
    let nation_obj = nations[Object.keys(nations)[i]];
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let name = document.createElement("td");  
    name.innerHTML = nation_obj.name;
    tr.appendChild(name); 
    let gov = document.createElement("td"); 
    gov.innerHTML = nation_obj.govtype;
    tr.appendChild(gov);
    let provcount = document.createElement("td");
    provcount.innerHTML = Object.keys(nation_obj.provinces).length;
    tr.appendChild(provcount);
    stuff.push(tr);
  }
  let modal = document.getElementById("diplomacy-modal");
  modal.style.display = "block";
  let span = document.getElementById("diplomacy-x");
  span.onclick = function() {
    modal.style.display = "none";
    for (i = 0; i < stuff.length; i++) {
      stuff[i].remove()
    }
  }
}

function news() {
  let modal = document.getElementById("newspaper-modal");
  modal.style.display = "block";
}

function resources() {
  let modal = document.getElementById("resources-modal");
  modal.style.display = "block";
}