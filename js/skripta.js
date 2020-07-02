var boje = {
	tiramisu: "BlanchedAlmond",
	cheesecake: "Azure"
};

/*Izvršiti validaciju forme upotrebom JavaScript tehnologije.	
Sva polja u formi moraju biti unesena kako bi se forma submitovala.
			
Na formi se nalaze dva checkbox-a, prvi ima vrednost Hrana, drugi ima vrednost Piće.
Oni označavaju da li korisnik želi hranu, piće ili oboje. 

Ukoliko se štikliraju oba checkbox-a, znači da korisnik želi i hranu i piće, onda select Dezert treba aktivirati 
(inicijalno je disabled).
Ukoliko se jedan checkbox deselektuje (bilo koji), select Dezert treba opet deaktivirati (vratiti na disabled)
			
Vrednost polja Dezert ima dve opcije: Cheesecake ili Tiramisu

Prilikom menjanja opcija select-a, paragraf select_dezert koji inicijalno ima vrednost:
"Odabrali ste : "
dopuniti sa podacima odabranog dezerta.

Tako da ako je odabran Cheesecake, u pomenutom paragrafu trebao bi da bude ispis:
"Odabrali ste : Cheesecake" i obojiti select_paragraf, kao i pozadinu submit dugmeta sa odgovarajućom vrednosti iz objekta boje. 

Ako je odabran Tiramisu, u istom paragrafu treba da pise:

"Odabrali ste : Tiramisu" i obojiti select_paragraf, kao i pozadinu submit dugmeta sa odgovarajućom vrednosti iz objekta boje. 

Objekat koji sadrzi vrednosti boja definisan je na sledeci nacin:

var boje = {
		tiramisu: "BlanchedAlmond",
		cheesecake: "Azure"
		};

Prilikom submita forme proveriti da li je bar jedan checkbox štikliran.
Forma se ne moze submitovati ukoliko bar jedan checkbox nije štikliran.

Napredno
---------------------
Onemogućiti submit forme ako se uneto Ime i Prezime ne poklapaju sa jednim od predfinisanih.
var osobe = [{ime: "Pera", prezime: "Peric"}, {ime: "Marko", prezime: "Markovic"}, 
			{ime: "Jovo", prezime:"Jovic"}];*/



var osobe = [{ime: "Pera", prezime: "Peric"}, 
			{ime: "Marko", prezime: "Markovic"}, 
			{ime: "Jovo", prezime:"Jovic"}];

function proveraForme(forma) {
	if(forma.ime.value == ""){
		return false;
	}
	if(forma.prezime.value == ""){
		return false;
	}
	if(!forma.hrana.checked && !forma.pice.checked){
		return false;
	}
	var cekirano = false;
	for(var i in osobe){
		if(osobe[i].ime == forma.ime.value  &&  osobe[i].prezime == forma.prezime.value){
			cekirano = true;
		}
	}
	return cekirano;
}

function checkboxTicked() {
	var hrana = document.getElementsByTagName("input").hrana;
	var pice = document.getElementsByTagName("input").pice;
	var dezert = document.getElementById("dezert");

	if(hrana.checked  &&  pice.checked){
		dezert.disabled = false;
	}else{
		dezert.disabled = true;
	}
	odabir();
}


function odabir() {
	var poruka = document.getElementById("poruka");
	var paragraf = document.getElementById("select_dezert");
	var btn = document.querySelector(".btn");

	if(dezert.value == "cheesekace"){
		poruka.innerHTML = "Cheesekace";
		paragraf.style.backgroundColor = boje.cheesecake;
		btn.style.backgroundColor = boje.cheesecake;
	
	}
	if(dezert.value == "tiramisu"){
		poruka.innerHTML = "Tiramisu";
		paragraf.style.backgroundColor = boje.tiramisu;
		btn.style.backgroundColor = boje.tiramisu;
		
	}
	if(dezert.value == ""  ||  dezert.disabled){
		poruka.innerHTML = "";
		paragraf.style.backgroundColor = null;
		btn.style.backgroundColor = null;
	}
}