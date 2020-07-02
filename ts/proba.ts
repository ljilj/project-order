var g: any;
let gosti: Gost[] = [];
let aktivanGost: Gost = null;

function promeniAktivnog(selekt: HTMLSelectElement){
    aktivanGost = gosti.filter((elem) => elem.jmbg == Number(selekt.value))[0]; 
    refreshIspis();
}

/*Implementirati Klasu Porudzbina, koja se sastoji od:
				-atributa:
					private _naziv: string;
					private _kolicina: number;
    				private _cena: number;
    				private _kategorija: string;
    			-konstruktora sa parametrima
    			-geter-a i seter-a za sve atrbite */

//TODO Implementirati klasu Porudzbina
class Porudzbina{
    private _naziv: string;
	private _kolicina: number;
    private _cena: number;
    private _kategorija: string;

    constructor(naziv:string, kolicina:number, cena: number, kategorija: string){
        this._naziv = naziv;
        this._kolicina = kolicina;
        this._cena = cena;
        this._kategorija = kategorija;
    }
    get naziv():string{
        return this._naziv;
    }
    set naziv(value:string){
        this._naziv = value;
    }
    get kolicina():number{
        return this._kolicina;
    }
    set kolicina(value:number){
        this._kolicina = value;
    }
    get cena():number{
        return this._cena;
    }
    set cena(value:number){
        this._cena = value;
    }
    get kategorija():string{
        return this._kategorija;
    }
    set kategorija(value:string){
        this._kategorija = value;
    }
}


/*Implementirati klasu Gost, koja se sastoji od:
				-atributa:
					private _jmbg: number;
					private _ime: string;
					private _prezime: string;
			    	private _porudzbine: Porudzbina[]; //Niz porudzbina koje restoran prodaje
                    -konstruktora (prima sve atribute osim niza porudzbina, niz porudzbina treba da bude 
                        inicijalno prazan niz)
				    -geter-i za sva polja
                    -seter-i za sva polja (osim _porudzbine)*/
                    
//TODO Implementirati klasu Gost
class Gost{
    private _jmbg: number;
	private _ime: string;
	private _prezime: string;
    private _porudzbine: Porudzbina[];

    constructor(jmbg: number, ime: string, prezime: string){
        this._jmbg = jmbg;
        this._ime = ime;
        this._prezime = prezime;
        this._porudzbine = [];
    }

    get jmbg():number{
        return this._jmbg;
    }
    set jmbg(value:number){
        this._jmbg = value;
    }
    get ime():string{
        return this._ime;
    }
    set ime(value:string){
        this._ime = value;
    }
    get prezime():string{
        return this._prezime;
    }
    set prezime(value:string){
        this._prezime = value;
    }
    get porudzbine():Porudzbina[]{
        return this._porudzbine;
    }
    /* -metoda:
            -naruci //prima objekat tipa Porudzbina i dodaje ga u niz porudzbina*/
    naruci(objekat:Porudzbina){
        this.porudzbine.push(objekat);
    }

    /*-metoda:
        -omiljenaKategorija //Služi za pronalaženje omiljene kategorije porudžbine i ispis odgovarajućeg 
        teksta na html (tip void, preporuka za implementaciju: od niza porudzbina, napraviti podniz 
        (uz pomoc filter funkcije) za svaku kategoriju (3 niza, po jedan za svaku varijantu) i onda vršiti 
        provere). 
        Klikom na dugme "Omiljena kategorija" u div-u sa id-om "kategorije" se ispisuje (za aktivnog gosta):
			
        <h3>Omiljena kategorija za gosta ${imeGosta} ${prezimeGosta} je: <br/> ${omiljenKategorijaGosta} sa 
        ukupno ${ukupnaKolicinaSvihPorudzbina} narudžbi.</h3>

        Omiljena kategorija gosta je kategorija iz koje je gost najviše (količinski) naručivao proizvode. 
        Odnosno, kategorija čija suma količine naručenih obroka iz niza porudžbine je najveća.
        
        Prilikom ispisa omiljene ili najnezastupljenije kategorija, ukoliko gost nema porudžbine ispisati poruku: 
			<h3>Gost ${imeGosta} ${prezimeGosta} jos uvek nema porucenih obroka!<h3>*/

    omiljenaKategorija():void{
        if(aktivanGost.porudzbine.length == 0){
            let div = document.getElementById("kategorije");
            div.innerHTML=`<h3>Gost ${aktivanGost.ime} ${aktivanGost.prezime} jos uvek nema porucenih 
            obroka!<h3>`;
    
        }else{
        let glavnoJelo =  this.porudzbine.filter((elem)=>elem.kategorija == "Glavno jelo");
        let Pice =  this.porudzbine.filter((elem)=>elem.kategorija == "Pice");
        let Dezert =  this.porudzbine.filter((elem)=>elem.kategorija == "Dezert");

        let OmiljenaKategorija:string="";
        let najvecaSuma=0;

        let suma1 = 0;
        for(let i in Pice){
            suma1+= Pice[i].kolicina;
        }

        let suma2 = 0;
        for(let i in glavnoJelo){
            suma2+= glavnoJelo[i].kolicina;
        }

        let suma3 = 0;
        for(let i in Dezert){
            suma3+= Dezert[i].kolicina;
        }

        if(suma1>suma2){
        OmiljenaKategorija = Pice[0].kategorija;
        najvecaSuma=suma1;
            if(suma3>suma1){
                OmiljenaKategorija = Dezert[0].kategorija;
                najvecaSuma=suma3;
            }
        }else if (suma2>suma3){
        OmiljenaKategorija = glavnoJelo[0].kategorija;
        najvecaSuma=suma2;
        }else {
        OmiljenaKategorija = Dezert[0].kategorija;
        najvecaSuma=suma3;
        }
    
        let div = document.getElementById("kategorije");
        
        div.innerHTML=`<h3>Omiljena kategorija za gosta ${aktivanGost.ime} ${aktivanGost.prezime} je: 
        <br/>${OmiljenaKategorija} sa ukupno ${najvecaSuma} narudzbi.</h3>`;
        }
          
    }

    /*-metoda:
        -najnezastupljenijaKategorija //Služi za pronalazenje najnezastupljenije kategorije i ispis 
        odgovarajućeg teksta na html (tip void, preporuka za implementaciju: od niza porudzbina, napraviti 
        podniz (uz pomoc filter funkcije) za svaku kategoriju (3 razlicita niza) i onda vršiti provere).
        
        Klikom na dugme "Najnezastupljenija kategorija" u div-u sa id-om "kategorije" se ispisuje 
        (za aktivnog gosta):
			
        <h3>Gost ${imeGosta} ${prezimeGosta} je najmanje naručivao proizvode kategorije: <br/> 
        ${najNezastupljenijaKategorija} sa ukupno porudžbina ${ukupanBrojPorudzbinaTeKategorija}.</h3>;
			
        Najnezastupljenija kategorija za gosta je kategorija koja se najmanje puta pojavljuje u nizu porudžbina 
        gosta (nezavisno od količine). 
        
        Prilikom ispisa omiljene ili najnezastupljenije kategorija, ukoliko gost nema porudžbine ispisati poruku: 
		<h3>Gost ${imeGosta} ${prezimeGosta} jos uvek nema porucenih obroka!<h3>*/

    NajnezastupljenijaKategorija(){
        if(aktivanGost.porudzbine.length == 0){
            let div = document.getElementById("kategorije");
            div.innerHTML=`<h3>Gost ${aktivanGost.ime} ${aktivanGost.prezime} jos uvek nema porucenih obroka!<h3>`;
    
        }else{
        let glavnoJelo =  this.porudzbine.filter((elem)=>elem.kategorija == "Glavno jelo");
        let Pice =  this.porudzbine.filter((elem)=>elem.kategorija == "Pice");
        let Dezert =  this.porudzbine.filter((elem)=>elem.kategorija == "Dezert");
        let NezastKategorija:string="";
        let najmanjaSuma=0;

        let suma1 = 0;
        for(let i in Pice){
            suma1+= Pice[i].kolicina;
        }

        let suma2 = 0;
        for(let i in glavnoJelo){
            suma2+= glavnoJelo[i].kolicina;
        }

        let suma3 = 0;
        for(let i in Dezert){
            suma3+= Dezert[i].kolicina;
        }

        if(suma1<suma2){
        NezastKategorija = Pice[0].kategorija;
        najmanjaSuma=suma1;
            if(suma3<suma1){
                NezastKategorija = Dezert[0].kategorija;
                najmanjaSuma=suma3;
            }
        }else if (suma2<suma3){
        NezastKategorija = glavnoJelo[0].kategorija;
        najmanjaSuma=suma2;
        }else {
        NezastKategorija = Dezert[0].kategorija;
        najmanjaSuma=suma3;
        }
    
        let div = document.getElementById("kategorije");
        
        div.innerHTML=`<h3>Gost ${aktivanGost.ime} ${aktivanGost.prezime} je najmanje narucivao proizvode kategorije: <br/>${NezastKategorija} sa ukupno ${najmanjaSuma} narudzbi.</h3>`;
        }
    } 

    /*-metoda:
        Implementirati dodatnu metode u klasi Gost:
		-getOmiljeniDezert(): String //Vraća dezert za koji je gost najviše puta kupio
        Za dobijanje niza jedinstvenih vrednosti moguće je iskoristiti filter funkciju sa slajdova termina 7:
        .filter((elem, i, array) => array.indexOf(elem) === i)*/
    getOmiljeniDezert():string{
        let listDezert = this._porudzbine.filter((elem) => elem.kategorija == "Dezert");
        let jedinstvenaLista = listDezert.filter(function(elem, i, arr) {
            return  arr.indexOf(elem) === i;
        });
        let listaD = [];
        let listaK = [];
        let omiljeni: string = "";

        for(let i=0; i<jedinstvenaLista.length; i++){
            let brojac = 0;
            for(let j=0; j<listDezert.length; j++){
                if(jedinstvenaLista[i].naziv == listDezert[j].naziv){
                    brojac += listDezert[j].kolicina;   
                }
            }
            listaD.push(jedinstvenaLista[i].naziv);
            listaK.push(brojac);
        }
        let najveci = 0;
        for(let i in listaD){
            if(najveci<listaK[i]){
                najveci = listaK[i];
                omiljeni = listaD[i];
            }
        }
        return omiljeni;
    }
}
//TODO Implementirati metodu za ispis podataka na sledeci nacin:
/*
    U div#porudzbine upisati ul listu sa sledecim formatom:
    <ul class="list-group">
        <li class="list-group-item"> 
            nazivPorudzbine (kategorijaPorudzbine) x kolicinPorudzbine
            <span class="badge">cenaPorudzbine</span>
        </li>
        <li class="list-group-item"> 
            ...
        </li>
        ...
    </ul>
    //Ponoviti li sa svaki od proizvoda u nizu proizvoda aktivnog kupca
*/



/*Implementirati funkciju refreshIspis koja u div sa id-om "porudzbine" ispisuje ul listu koja sadrži svaku 
od porudžbina aktivnog gosta u svom li tagu, primer izgleda liste: 
			
	<div id="porudzbine">
		<ul class="list-group">
			<li class="list-group-item">Tiramisu (Dezert) x 2 <span class="badge">350</span></li>
			<li class="list-group-item">Kolenica (Glavno jelo) x 1 <span class="badge">2300</span></li>
			<li class="list-group-item">Sauvignon blanc (Pice) x 2 <span class="badge">1500</span></li>
			<li class="list-group-item">Mouton Cadet (Pice) x 3 <span class="badge">1350</span></li>
			<li class="list-group-item">Krempita (Dezert) x 5 <span class="badge">450</span></li>
			<li class="list-group-item">Muckalica (Glavno jelo) x 1 <span class="badge">1850</span></li>
		</ul>
    </div> 
Izmeniti funkciju refreshIspis tako da ukoliko se ispisuje omiljeni dezert, svi odgovarajući <li> tagovi treba 
da imaju dodatnu klasu list-group-item-success odnosno:

	<li class="list-group-item list-group-item-success">Krempita (Dezert) x 5 <span class="badge">2300</span></li>
    <li class="list-group-item list-group-item-success">Krempita (Dezert) x 1 <span class="badge">460</span></li>*/
    
function refreshIspis(): void {
   let div = document.getElementById("porudzbine");
   let li: string = "";

   for(let i=0; i<this.aktivanGost.porudzbine.length; i++){
    let poruzbina= aktivanGost.porudzbine[i];
    if(poruzbina.naziv==aktivanGost.getOmiljeniDezert()){
    li+= `<li class="list-group-item list-group-item-success">${poruzbina.naziv}(${poruzbina.kategorija}) x ${poruzbina.kolicina}<span class="badge">${poruzbina.cena}</span></li>`;
    }else{
    li+= `<li class="list-group-item">${poruzbina.naziv}(${poruzbina.kategorija}) x ${poruzbina.kolicina}<span class="badge">${poruzbina.cena}</span></li>`;
    }
}
div.innerHTML=`<ul class="list-group">${li}</ul>`;
let ispis= document.getElementById("kategorije");
ispis.innerHTML="";

}



/*Implementirati funkciju wireEvents koja povezuje klik događaje sa dugmićima:
    -za naruci: kupe se informacije o porudžbini iz odgvarajućih input/select polja i pravi se novi objekat 
    tipa Porudzbina, novi objekat se dodaje u aktivnog gosta, u okviru ovog callback-a pozvati funkciju 
    refreshIspis
	-za omiljenjaKategorija: poziva se metoda omiljenaKategorija aktivnog gosta
	-za najnezastupljenijaKategorija: poziva se metoda najnezastupljenijaKategorija aktivnog gosta */

//TODO Implementirati wireEvents

function wireEvents(): void {
    document.getElementById("omiljenaKategorija").addEventListener("click",()=>{
        aktivanGost.omiljenaKategorija();
    });
    document.getElementById("najnezastupljenijaKategorija").addEventListener("click",()=>{
        aktivanGost.NajnezastupljenijaKategorija();
    });
    document.getElementById("naruci").addEventListener("click",()=>{
        let naziv:HTMLInputElement = document.getElementById("naziv")as HTMLInputElement;
        let kolicina:HTMLInputElement = document.getElementById("kolicina")as HTMLInputElement;
        let kategorija:HTMLInputElement = document.getElementById("kategorija")as HTMLInputElement;
        let cena:HTMLInputElement = document.getElementById("cena")as HTMLInputElement;
        let p:Porudzbina = new Porudzbina(naziv.value ,Number(kolicina.value),Number(cena.value),kategorija.value);
        aktivanGost.naruci(p);
        refreshIspis();
    }); 
   
}

//Ovaj kod ostaviti na dnu fajla
window.onload = function() {
    //TESTIRATI NAPISANE KLASE U OVOM DELU:




    //END OF TEST

    g.forEach((elem) => {
        let s: Gost = new Gost(Number(elem.jmbg), elem.ime, elem.prezime);
        elem.porudzbine.forEach((elem) => {
            let p: Porudzbina = new Porudzbina(elem.naziv, Number(elem.kolicina), Number(elem.cena), elem.kategorija);
            s.naruci(p);
        });
        gosti.push(s);
        if(aktivanGost == null){
            aktivanGost = s;
        }
    });
    if(QueryString.ime != null){
        var gost = new Gost(9999999999999, QueryString.ime, QueryString.prezime);
        gosti.push(gost);    
    }
    let selekt: HTMLElement = document.getElementById("gost");
    let output: string = "";
    for(let i = 0; i < gosti.length; i++){
        let optionElem = `<option value=${gosti[i].jmbg}>${gosti[i].ime} ${gosti[i].prezime}</option>`;
        output += optionElem;         
    }
    selekt.innerHTML = output;
    refreshIspis();
    wireEvents();
}


var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string: any = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

