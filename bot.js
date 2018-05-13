const Discord = require('discord.js');
const client = new Discord.Client();

/*** Generic variables ***/

var red = 0x880000;
var green = 0x008800;
var blue = 0x000088;
var yellow = 0x888800;
var turquoise = 0x0055aa;
var purple = 0x6b1e91;
var white = 0xffffff;
var black = 0x000000;
	
/*** Generic functions ***/

function randomInt(n){
	return Math.floor(Math.random()*n);
}

function randomNumber(n){
	return Math.floor(Math.random()*n) + 1;
}

function randomGrade(){
	return Math.floor(Math.random()*21);
}

function randomIn(t){
	return t[Math.floor(Math.random()*t.length)];
}

function reduceToSet(t){
	var seen = {};
	for(var i=t.length-1;i>=0;i--){
		var el = t[i];
		if( seen[el] ){
			t.splice(i,1);
		} else {
			seen[el] = true;
		}
	}
	return t;
}

function permute(n){
	var integers = [];
	var s_n = [];
	for(var i=0;i<n;i++){
		integers[i] = i;
	}
	while( n > 0 ){
		s_n.push((integers.splice(Math.floor(Math.random()*integers.length),1))[0]);
		n--;
	}
	return s_n;
}

function multiRandomIn( t, n ){
	if( n < 1 )
		return [];
	if( n > t.length )
		n = t.length;
	var arr = [];
	var indexes = permute(t.length);
	for( var k=0; k < n; k++ ){
		arr.push(t[indexes[k]]);
	}
	return arr;
}

function randomVotes(n){
	var l = [];
	for(var i=0;i<n;i++){
		l[i] = 0;
	}
	for(var quota=100;quota>0;quota--){
		l[Math.floor(Math.random()*n)] += 1;
	}
	return l;
}

function dateDuJour(){
	var arr = new Date().toISOString().replace(/T/, '-').split('-');
	return arr[2] + "/" + arr[1] + "/" + arr[0];
}

function isStringInteger(args){
	if(!args)
		return false;
	if(args !== '0' && args.charAt(0) === '0')
		return false;
	for(var j=0;j<args.length;j++){
		var c = args.charAt(j);
		if( c !== '0' && c !== '1' && c !== '2' && c !== '3' && c !== '4' && c !== '5' && c !== '6' && c !== '7' && c !== '8' && c !== '9' )
			return false;
	}
	return true;
}

function maxOccurence( arr ){
	var n = arr.length;
    if( n == 0 )
        return null;
    var map = {};
    var elementMax = arr[0];
	var	occMax = 1;
    for(var i=0; i<n; i++){
        var e = arr[i];
        if( !map[e] )
            map[e] = 1;
        else
            map[e] += 1; 
        if( map[e] > occMax ) {
            elementMax = e;
            occMax = map[e];
        }
    }
    return [elementMax, occMax];
}

/*** Aikatsu - tarot ***/

function Carte(nom, message, url){
	this.nom = nom;
	this.message = message;
	this.url = url;
	this.toString = function(){
		return "**" + this.nom + "** " + this.url + "\n" + this.message;
	}
}

var aikatsu = [
	new Carte("Ichigo","Ichigo représente un être encore absorbé par les apparences et les illusions. Ichigo est la jeunesse créative, l'innocence infantile, la spontanéité, la verdeur, mais aussi le manque de profondeur et d'expérience.","http://static.zerochan.net/Hoshimiya.Ichigo.full.1990915.jpg"),
	new Carte("Aoi","Aoi représente tout ce qui est en rapport avec les études, la formation, l'apprentissage. Elle est donc en relation avec la réflexion, le travail mental et l'analyse. Son regard est orienté vers la gauche, c'est-à-dire vers le passé. Sa question est \"que m'enseignent les écritures sur mes origines?\"","http://static.zerochan.net/Kiriya.Aoi.full.1990916.jpg"),
	new Carte("Ran","Ran est l'accès à la maîtrise de l'idée et du savoir, qui autorise l'engendrement avec certitude et sagesse. Elle récapitule à la fois Ichigo et Aoi. Ran reste ouverte au changement et peut encore se permettre d'agir contre ce qu'elle ne possède pas encore.","http://static.zerochan.net/Shibuki.Ran.full.2032988.jpg"),
	new Carte("Yurika","Yurika est le signe stable du pouvoir acquis et tenu, de la possession matérielle. Cette stabilité est tout à la fois un bien, puisqu'on peut lui faire confiance, mais un défaut car Yurika ne fait que suivant son habitude. Elle s'oppose naturellement à toute modification de ce qu'elle possède.","http://static.zerochan.net/Toudou.Yurika.full.1990919.jpg"),
	new Carte("Sakura","Sakura est le doute qui est mis en avant, l'incertitude quant au bon chemin à prendre. Elle doit être vue comme une épreuve subie, comme de se retrouver sur le gril de sa propre conscience. Là ou l'on se pensait être stable et sûr de soi, il existe toujours des situations où l'on a envie de rejeter ce qui est déjà acquis pour des plaisirs sans lendemain.","http://static.zerochan.net/Kitaouji.Sakura.full.1990911.jpg"),
	new Carte("Seira","Seira est le symbole des difficultés vaincues. Après avoir réalisé l'amour inconditionnel, s'être réalisé dans sa vie matérielle et spirituelle, l'homme a réussi son parcours, le voile est levé.","http://static.zerochan.net/Otoshiro.Seira.full.1990925.jpg"),
	new Carte("Risa","Risa dit toujours la vérité, tant en positif qu'en négatif. Il ne s'agit pas de la justice humaine, mais d'une justice parfaite, celle qui ne fait aucune erreur. La justice est comme le réel qui ni ne ment ni ne se trompe. Ce qui est faux sera toujours faux et ce qui est vrai le sera toujours.","http://static.zerochan.net/Shirakaba.Risa.full.1989041.jpg"),
	new Carte("Mizuki","Mizuki est celle qui amène la lumière dans les ténèbres, celle qui est capable de trier et de démêler sans effort l'inextricable, et l'inexprimable. Là où se trouve la nuit, la lune vient éclairer le requérant sur une facette du problème que celui-ci n'avait pas pris en compte. Elle doit éclairer le requérant, mais gare à sa lumière. Celle-ci par sa vérité brûlera sans doute autant les yeux de celui-ci.","http://static.zerochan.net/Kanzaki.Mizuki.full.1990927.jpg"),
	new Carte("Rin","Rin représente la fin d'un cycle et le retour au début d'un autre. Elle indique qu'une connaissance a été acquise et qu'il faut donc s'attendre à une évolution sûre de la vie. Elle peut aussi symboliser un état de changement passé, présent ou à venir. Rin est dans tous les cas très dynamique et indique qu'il faut se prémunir contre ses effets possiblement négatifs.","http://static.zerochan.net/Kurosawa.Rin.full.1990917.jpg"),
	new Carte("Nono","C'est dans la douceur, la passivité, la sérénité que Nono peut puiser une force infinie. Elle symbolise entre autres le courage, la force morale, la maîtrise de ses énergies et de ses pulsions animales.","http://static.zerochan.net/Daichi.Nono.full.1990920.jpg"),
	new Carte("Sora","Sora implique la tempérance. La personne qui se modère est celle qui s’oblige à résister à l’attraction excessive des passions et des plaisirs. Sora exprime la nécessité de dominer certains instincts, de façon à ce qu’au travers de cette vertu, ils s’équilibrent.","http://static.zerochan.net/Kazesawa.Sora.full.1990926.jpg"),
	new Carte("Kii","Kii annonce une période de chance et de rayonnement, tout va dans le bon sens. Elle représente l’esprit épanoui, capable d’harmoniser les forces contraires et opposées.","http://static.zerochan.net/Saegusa.Kii.full.1990923.jpg"),
	new Carte("Kokone","Kokone est symbole de transformation, de renaissance, de renouveau, pour celui qui sait écouter sa voix intérieure, son ange, son intuition.","http://static.zerochan.net/Kurisu.Kokone.full.2032987.jpg"),
	new Carte("Akari","Akari signifie voir plus grand et s'ouvrir. L'avenir exigera de s'éveiller à sa réalité extérieure, de penser au monde extérieur et à la grandeur des choses. L'individu a la qualité de s'ouvrir à sa réalité extérieure et que cette qualité trouve son utilité maintenant.","http://static.zerochan.net/Oozora.Akari.full.1990913.jpg"),
	new Carte("Kaede","Kaede est libre, elle va et vient au gré de ses envies et des possibilités de la vie. Elle chemine avec juste le bagage qui lui est nécessaire, son âme et saura se débrouiller dans toutes les situations. C’est une personne originale qui bien sûr a des comportements inattendus, parfois surprenants ou même choquants. C’est en elle que l’on peut trouver la plus grande liberté, la plus grande évolution mais aussi le chaos et la folie.","http://static.zerochan.net/Ichinose.Kaede.full.1990924.jpg")
];

function randomAikatsuCard(){
	return randomIn(aikatsu);
}

/*** Choix ***/

function analyseChoix(args){
	var arr = reduceToSet(args.split(" ou "));
	if(arr.length >= 2){
		return "Je choisis **" + randomIn(arr) + "**";
	}
	return "Il n'y a pas assez de choix!";
}

/*** Classement ***/

function analyseClassement(args){
	var arr = reduceToSet(args.split(" et "));
	var l = arr.length;
	if( l >= 2 ){
		var str = "";
		var p = permute(l);
		for(var i=0;i<l;i++){
			str += "**" + (i+1) + "** " + arr[p[i]] + "\n";
		}
		return str;
	}
	return "Il n'y a pas assez à classer!";
}

/*** Pile ou Face ***/

var pileURL = "https://i.imgur.com/EJHCuFo.png";
var faceURL = "https://i.imgur.com/2MyXAgS.png";

function randomProfileColor(){
	return randomIn([red, green, blue, yellow, turquoise, purple, white, black]);
}

function Player(id){
	this.id = id;
	this.cash = 484;
	this.gain = function(n){
		this.cash += n;
	}
	this.lose = function(n){
		this.cash -= n;
	}
	this.getRichEmbed = function(username, avatarURL){
		return {
			"title": "Stats de " + username,
			"color": randomProfileColor(),
			"thumbnail" : {
				"url": avatarURL
			},
			"fields": [
				{
					"name": "ID " + this.id,
					"value": "**Cash** " + this.cash
				}
			]
		};
	}
}

var players = [];

function fetchPlayer(id){
	for(var i=0;i<players.length;i++){
		if( players[i].id == id )
			return players[i];
	}
	var p = new Player(id);
	players.push(p);
	return p;
}

function flip(){
	return randomInt(2) == 0 ? "Pile " + pileURL : "Face " + faceURL;
}

function flipCoin(id, args){
	var p = fetchPlayer(id);
	var arr = args.split(" ");
	if( arr.length < 2 )
		return flip();
	var amount = parseInt(arr[0]);
	if( isNaN(amount) || amount < 1 )
		return flip();
	var side = arr[1].toLowerCase();
	if( side != "pile" && side != "face" && side != "p" && side != "f" )
		return flip();
	if( amount > p.cash ){
		return "Tu n'as plus assez d'argent!\n" + flip();
	}
	if( randomInt(2) == 0 ){
		if( side == "pile" || side == "p" ){
			p.cash += amount;
			return "Pile! Tu gagnes " + amount + "! " + pileURL;
		}
		else{
			p.cash -= amount;
			return "Pile! Tu perds " + amount + "! " + pileURL;
		}
	} else {
		if( side == "face" || side == "f" ){
			p.cash += amount;
			return "Face! Tu gagnes " + amount + "! " + faceURL;
		}
		else{
			p.cash -= amount;
			return "Face! Tu perds " + amount + "! " + faceURL;
		}
	}
}

function getRichEmbed(id, username, avatarURL){
	var p = fetchPlayer(id);
	return p.getRichEmbed(username, avatarURL);
}

/*** Dé ***/

function throwDice( args ){
	var x = 6;
	var y = 1;
	var max_x = 1000000000000;
	var max_y = 100;
	var result = "<:game_die:364173898612342784>";
	if( args != "" ){
		args = args.split(" ");
		var a = parseInt(args[0]);
		if( !isNaN(a) && a > 1 && a < max_x ){
			x = a;
		}
		if( args.length > 1 ){
			var b = parseInt(args[1]);
			if( !isNaN(b) && b > 1 && b < max_y ){
				y = b;
			}
		}
	}
	for(var k=0;k<y;k++){
		result += " " + randomNumber(x);
	}
	if( result.length <= 2000 ){
		return result;
	} else {
		return "Le résultat est trop long";
	}
}

/*** Horoscope ***/

var zodiac = [
	"<:aries:373093093592793089>",
	"<:taurus:373093093592793089>",
	"<:gemini:373093093592793089>",
	"<:cancer:373093093592793089>",
	"<:leo:373093093592793089>",
	"<:virgo:373093093592793089>",
	"<:libra:373093093592793089>",
	"<:scorpius:373093093592793089>",
	"<:sagittarius:373093093592793089>",
	"<:capricorn:373093093592793089>",
	"<:aquarius:373093093592793089>",
	"<:pisces:373093093592793089>",
];

function randomHoroscope(){
	var signesZodiac = multiRandomIn(zodiac, zodiac.length);
	var horoscope = "Aujourd'hui, des plus chanceux aux moins chanceux : \n";
	for(var i=0; i<11; i++){
		horoscope += signesZodiac[i] + " ";
	}
	return horoscope + signesZodiac[11];
}

/*** Jankenpon ***/

var rock = "<:mountain:373082469005656074>";
var scissors = "<:scissors:373082337203847168>"; 
var paper = "<:leaves:373082324507557899>";
var lizard = "<:lizard:373082300906340362>";
var alien = "<:alien:373082300906340362>";
var chifumis = [rock, scissors, paper, lizard, alien];

function isChifumi( c ){
	for(var i=0;i<chifumis.length;i++){
		if( chifumis[i] == c )
			return true;
	}
	return false;
}

function jankenponResult( humanChifumi, botChifumi ){
	if( humanChifumi == botChifumi ){
		return "Égalité!";
	} else if( humanChifumi == rock ){
		if( botChifumi == paper ){
			return "La feuille recouvre la pierre, tu as perdu!";
		} else if( botChifumi == scissors ) {
			return "La pierre écrase les ciseaux, tu as gagné!";
		}  else if( botChifumi == lizard ) {
			return "La pierre écrase le lézard, tu as gagné!";
		}  else if( botChifumi == alien ) {
			return "Spock vaporise la pierre, tu as perdu!";
		}
	} else if ( humanChifumi == scissors ){
		if( botChifumi == rock ){
			return "La pierre écrase les ciseaux, tu as perdu!";
		} else if( botChifumi == paper ){
			return "Les ciseaux coupent la feuille, tu as gagné!";
		} else if( botChifumi == lizard ) {
			return "Les ciseaux décapitent le lézard, tu as gagné!";
		}  else if( botChifumi == alien ) {
			return "Spock fracasse les ciseaux, tu as perdu!";
		}
	} else if( humanChifumi == paper ){
		if( botChifumi == rock ){
			return "La feuille recouvre la pierre, tu as gagné!";
		} else if( botChifumi == scissors ) {
			return "Les ciseaux coupent la feuille, tu as perdu!";
		}  else if( botChifumi == lizard ) {
			return "Le lézard mange la feuille, tu as perdu!";
		}  else if( botChifumi == alien ) {
			return "La feuille désavoue Spock, tu as gagné!";
		}
	} else if( humanChifumi == lizard ){
		if( botChifumi == rock ){
			return "La pierre écrase le lézard, tu as perdu!";
		} else if( botChifumi == paper ){
			return "Le lézard mange la feuille, tu as gagné!";
		} else if( botChifumi == scissors ) {
			return "Les ciseaux décapitent le lézard, tu as perdu!";
		} else if( botChifumi == alien ) {
			return "Le lézard empoisonne Spock, tu as gagné!";
		}
	}  else if( humanChifumi == alien ){
		if( botChifumi == rock ){
			return "Spock vaporise la pierre, tu as gagné!";
		} else if( botChifumi == paper ){
			return "La feuille désavoue Spock, tu as perdu!";
		} else if( botChifumi == scissors ) {
			return "Spock fracasse les ciseaux, tu as gagné!";
		}  else if( botChifumi == lizard ) {
			return "Le lézard empoisonne Spock, tu as perdu!";
		}
	}
}

function playChifumi( humanChifumi ){
	var humanChifumi = humanChifumi.toLowerCase();
	if( humanChifumi == "pierre" )
		humanChifumi = rock;
	else if( humanChifumi == "ciseaux" )
		humanChifumi = scissors;
	else if( humanChifumi == "feuille" )
		humanChifumi = paper;
	else if( humanChifumi == "lézard" )
		humanChifumi = lizard;
	else if( humanChifumi == "spock" )
		humanChifumi = alien;
	else
		return humanChifumi + " n'est pas un signe valable!";
	var botChifumi = randomIn(chifumis);
	return humanChifumi + " " + botChifumi + " " + jankenponResult( humanChifumi, botChifumi );
}

/*** Lang ***/

var voyelles = ["a","a","e","e","e","i","o","u","y"];
var syllabes = [ "ba", "ba", "be", "be", "be", "bi", "bo", "bu", "by", "ca", "ca", "ce", "ce", "ce", "ci", "co", "cu", "cy", "da", "da", "de", "de", "de", "di", "do", "du", "dy", "fa", "fa", "fe", "fe", "fe", "fi", "fo", "fu", "fy", "ga", "ga", "ge", "ge", "ge", "gi", "go", "gu", "gy", "ha", "ha", "he", "he", "he", "hi", "ho", "hu", "hy", "ja", "ja", "je", "je", "je", "ji", "jo", "ju", "jy", "ka", "ka", "ke", "ke", "ke", "ki", "ko", "ku", "ky", "la", "la", "le", "le", "le", "li", "lo", "lu", "ly", "la", "la", "le", "le", "le", "li", "lo", "lu", "ly", "ma", "ma", "me", "me", "me", "mi", "mo", "mu", "my", "ma", "ma", "me", "me", "me", "mi", "mo", "mu", "my", "na", "na", "ne", "ne", "ne", "ni", "no", "nu", "ny", "na", "na", "ne", "ne", "ne", "ni", "no", "nu", "ny", "pa", "pa", "pe", "pe", "pe", "pi", "po", "pu", "py", "pa", "pa", "pe", "pe", "pe", "pi", "po", "pu", "py", "qa", "qa", "qe", "qe", "qe", "qi", "qo", "qu", "qy", "ra", "ra", "re", "re", "re", "ri", "ro", "ru", "ry", "ra", "ra", "re", "re", "re", "ri", "ro", "ru", "ry", "ra", "ra", "re", "re", "re", "ri", "ro", "ru", "ry", "sa", "sa", "se", "se", "se", "si", "so", "su", "sy", "sa", "sa", "se", "se", "se", "si", "so", "su", "sy", "ta", "ta", "te", "te", "te", "ti", "to", "tu", "ty", "ta", "ta", "te", "te", "te", "ti", "to", "tu", "ty", "va", "va", "ve", "ve", "ve", "vi", "vo", "vu", "vy", "wa", "wa", "we", "we", "we", "wi", "wo", "wu", "wy", "xa", "xa", "xe", "xe", "xe", "xi", "xo", "xu", "xy", "za", "za", "ze", "ze", "ze", "zi", "zo", "zu", "zy"];

function randomWord(){
	var word = (Math.random() < 0.5) ? "" : randomIn(voyelles);
	var n = randomNumber(6);
	for(var k=0;k<n;k++){
		word += randomIn(syllabes);
	}
	word = (Math.random() < 0.5) ? word : word.substring(0, word.length-1);
	return word;
}

function randomSentence(){
	var sentence = "";
	var nbWords = 5 + randomInt(5);
	for(var l=0;l<nbWords;l++){
		sentence += randomWord() + " ";
	}
	return sentence;
}

/*** Lottery ***/

var smileys = [
	" <:slight_smile:394497905811259392>",
	" <:upside_down:394497905811259392>",
	" <:yum:394497905811259392>",
	" <:heart_eyes:394497905811259392>",
	" <:kissing_heart:394497905811259392>",
	" <:sunglasses:394497905811259392>",
	" <:hugging:394497905811259392>",
	" <:thinking:394497905811259392>",
	" <:frowning2:394497905811259392>",
	" <:confounded:394497905811259392>",
	" <:cat:394497905811259392>",
	" <:sun_with_face:394497905811259392>",
	" <:full_moon_with_face:394497905811259392>",
	" <:star:394497905811259392>"
];

function randomLottery(){
	var lottery = [];
	var str = "";
	for(var i=0;i<7;i++){
		var emote = randomIn(smileys);
		lottery.push( emote );
		str += emote;
	}
	var maxes = maxOccurence(lottery);
	var emote = maxes[0];
	var occ = maxes[1];
	if( occ >= 3 )
		str += "\n<:tada:394497275579072512> Félicitations! Autant de" + emote + " c'est spécial!";
	else
		str += "\nTrès mauvais tirage cela est.";
	return str;
}

/*** Compter en Jap ***/

var chiffresRomajis = [ "rei", "ichi", "ni", "san", "yon", "go", "roku", "nana", "hachi", "kyū" ];
var chiffresKanjis = [ "〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

// hyperdecomposition("123456789") = [ ['9', '8', '7', '6'], ['5', '4', '3', '2'], ['1'] ]
function hyperdecomposition(str){
	var arr = [[]], i = 0, j = 0, k = 0;
	var l = str.length - 1;
	while( k <= l ){
		if(j == 4){
			i += 1;
			arr.push([]);
			j = 0;
		}
		arr[i].push( str.charAt(l-k) );
		j++;
		k++;
	}
	return arr;
}

function blocEnJaponais(d){
	var l = d.length - 1, romaji = "", kanji = "", c;
	// MILLIERS
	if( l == 3 ){
		c = d[l];
		if( c != 0 ){
			if( c == 1 ){
				romaji += " sen";
			} else {
				if( c == 3 ){
					romaji += " san zen";
				} else {
					romaji += " " + chiffresRomajis[c] + " sen";
				}
				kanji += " " + chiffresKanjis[c];
			}
			kanji += " 千";
		}
		l--;
	}
	// CENTAINES
	if( l == 2 ){
		c = d[l];
		if( c != 0 ){
			if( c == 1 ){
				romaji += " hyaku";
			}
			else if( c == 3 ){
				romaji += " san byaku";
				kanji += " 三";
			} else if( c == 6 ){
				romaji += " rop pyaku";
				kanji += " 六";
			} else if( c == 8 ) {
				romaji += " hap pyaku";
				kanji += " 八";
			} else {
				romaji += " " + chiffresRomajis[c] + " hyaku";
			}
			kanji += " 百";
		}
		l--;
	}
	// DIZAINES
	if( l == 1 ){
		c = d[l];
		if( c != 0 ){
			if( c != 1 ){
				romaji += " " + chiffresRomajis[c];
				kanji += " " + chiffresKanjis[c];
			}
			romaji += " jū";
			kanji += " 十";
		}
		l--;
	}
	// UNITES
	c = d[l];
	if( c != 0 ){
		romaji += " " + chiffresRomajis[c];
		kanji += " " + chiffresKanjis[c];
	}
	return [romaji, kanji];
}

var categoriesRomajis = ["man", "oku", "chō", "kei", "gai", "jo", "jō", "kō", "kan", "sei", "sai", "goku", "gōgasha", "asōgi", "nayuta", "fukashigi", "muryōtaisū" ];
var categoriesKanjis =  ["万", "億", "兆", "京", "垓", "𥝱", "穣", "溝", "澗", "正", "載", "極", "恒河沙", "阿僧祇", "那由他", "不可思議", "無量大数" ];

function enJaponais(args){
	if( args == '0' )
		return ["rei", "〇"];
	var h = hyperdecomposition(args);
	var romaji = "", kanji = "", l = h.length - 1, arr;
	for(var i=l; i>0; i--){
		arr = blocEnJaponais(h[i]);
		romaji += arr[0] + " " + categoriesRomajis[i-1];
		kanji += arr[1] + " " + categoriesKanjis[i-1];
	}
	arr = blocEnJaponais(h[0]);
	romaji += arr[0];
	kanji += arr[1];
	return [romaji, kanji];
}

function convertNombreJaponais(args){
	// MAX_LENGTH = (categoriesRomajis.length=17+1=18) * 4
	if( args.length > 72 )
		return "Nombre trop grand!";
	// checks if args is a string containing only 0-9 digits
	if( !isStringInteger(args) )
		return false;
	var arr = enJaponais(args);
	return arr[0] + " " + arr[1];
}

/*** Idol Rate ***/

function rateUser(username, avatarURL){
	var charm = randomGrade();
	var cool = randomGrade();
	var sexy = randomGrade();
	var craze = randomGrade();
	var color;
	if( charm == cool || charm == sexy || cool == sexy ){
		color = white;
	} else if ( craze >= charm && craze >= cool && craze >= sexy ){
		color = black;
	} else if( charm > cool ) {
		if( charm > sexy ){
			color = red;
		} else {
			color = purple;
		}
	} else {
		if( cool > sexy ){
			color = blue;
		} else {
			color = purple;
		}
	}
	var richEmbed = {
		"title": "Stats de " + username,
		"color": color,
		"thumbnail" : {
			"url": avatarURL
		},
		"fields": [
			{
				"name": "ღCharmeღ",
				"value": charm + " pts"
			},
			{
				"name": "☆Cool☆",
				"value": cool + " pts"
			},
			{
				"name": "★Sexy★",
				"value": sexy + " pts"
			},
			{
				"name": "₮Folie₮",
				"value": craze + " pts"
			}
		]
	};
	return richEmbed;
}

var record = [];

function getRecordRate(id){
	for(var i=0;i<record.length;i++){
		if( record[i].id == id )
			return record[i].rate;
	}
	return undefined;
}

function getRating(id, username, avatarURL){
	var rate = getRecordRate(id);
	if( !rate ){
		rate = rateUser(username, avatarURL);
		record.push({id: id, rate: rate});
	}
	return rate;
}

/*** Ship ***/

function ship( membersCollection ){
	if( !membersCollection ){
		return "Cette commande ne fonctionne pas en privé";
	}
	var userA = membersCollection.random().user;
	var userB = userA;
	while( userB.equals(userA) ){
		userB = membersCollection.random().user;
	}
	var synergy = randomInt(101);
	return "<@" + userA.id + "> x <@" + userB.id + ">\nChance de succès **" + synergy + "%**";
}

/*** COMMANDES ***/

function commandes( message, cmd, args ){
	var id = message.author.id;
	function sendText(s){
		if(s)
			message.channel.send(s).catch(console.error);
	}
	function mention(s){
		if(s)
			message.channel.send("<@" + id + "> " + s).catch(console.error);
	}
	function sendEmbed(e){
		if(e)
			message.channel.send({embed:e}).catch(console.error);
	}
	switch( cmd.toLowerCase() ){
		case 'help':
			sendText("aikatsu avatar choix classe de horoscope g5 lang lot nj p $ stat ship");
		break;
		 case 'aikatsu':
			var carte = randomAikatsuCard();
			mention( carte.toString() );
		 break;
		case 'avatar':
			var user = message.mentions.users.first();
			if(!user)
				user = message.author;
			sendText( user.avatarURL );
		break;
		case 'choix':
			if(args)
				sendText( analyseChoix(args) );
		break;
		case 'classe':
			if(args)
				sendText( analyseClassement(args) );
		break;
		case 'de':
			sendText( throwDice(args) );
		break;
		case 'horoscope':
			sendText( randomHoroscope() );
		break;
		case 'jankenpon':
		case 'g5':
			if(args)
				sendText( playChifumi(args) );
		break;
		case 'lang':
			sendText( randomSentence() );
		break;
		case 'lot':
			sendText( randomLottery() );
		break;
		case 'nj':
			sendText( convertNombreJaponais(args) );
		break;
		case "p":
			sendText( flipCoin(id, args) );
		break;
		case "$":
			var author = message.author;
			var richEmbed = getRichEmbed(id, author.username, author.avatarURL);
			sendEmbed(richEmbed);
		break;
		case 'stat':
			var user = message.mentions.users.first();
			if ( !user ){
				user = message.author;
			}
			sendEmbed(getRating(user.id, user.username, user.avatarURL));
		break;
		case 'ship':
			sendText( ship( message.channel.members ) );
		break;
	}
}

client.on('message', message => {
	if( message.author.bot )
		return;
	var id = message.author.id;
	var input = message.content;
	var sign = input.charAt(0);
	if ( sign != '!' )
		return;
	input = input.substring(1);
	var i = input.indexOf(' ');
	if( i == -1 ){
		var cmd = input;
		var args = "";
	} else {
		var cmd = input.substr(0,i);
		var args = input.substr(i+1);
	}
	commandes( message, cmd, args );
});

client.on('ready', () => {
	if(client.user.username != "Hades 黄泉"){
		//client.user.setUsername("Amaterasu 天照").catch(console.error);
		client.user.setUsername("Hades 黄泉").catch(console.error);
	}
	console.log( client.user.username + ' [' + client.user.id + '] est en ligne!');
});

client.on('error', error => {
	console.log( error.message ); 
});

client.login(process.env.BOT_TOKEN).catch(console.error);
