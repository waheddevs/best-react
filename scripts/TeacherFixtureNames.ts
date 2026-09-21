// Fictional local-development identities only; never use real student data here.
const femaleFirstNames = [
  "Adiba",
  "Alima",
  "Asal",
  "Aziza",
  "Bonu",
  "Dilnoza",
  "Feruza",
  "Gavhar",
  "Gulnoza",
  "Hilola",
  "Iroda",
  "Kamola",
  "Lola",
  "Madina",
  "Malika",
  "Mohira",
  "Munisa",
  "Nargiza",
  "Nigora",
  "Parvina",
  "Sabrina",
  "Sevara",
  "Sitora",
  "Soliha",
  "Umida",
  "Yasmina",
  "Zarnigor",
  "Zilola",
  "Ziyoda",
  "Shukrona",
  "Sumayya",
  "Mubina",
] as const;

const maleFirstNames = [
  "Akbar",
  "Anvar",
  "Behruz",
  "Bekzod",
  "Diyor",
  "Elbek",
  "Farrux",
  "Humoyun",
  "Ilhom",
  "Jasur",
  "Javohir",
  "Komron",
  "Laziz",
  "Mansur",
  "Murod",
  "Nodir",
  "Otabek",
  "Oybek",
  "Ravshan",
  "Sardor",
  "Shahzod",
  "Temur",
  "Umar",
  "Zafar",
  "Aziz",
  "Bobur",
  "Doniyor",
  "Ilyos",
  "Kamol",
  "Muhammadali",
  "Muhammadamin",
  "Mustafo",
] as const;

const maleSurnames = [
  "Abdullayev",
  "Akbarov",
  "Aliyev",
  "Asqarov",
  "Azimov",
  "Bekmurodov",
  "Berdiyev",
  "Davronov",
  "Ergashev",
  "Eshonqulov",
  "Fayzullayev",
  "Hamidov",
  "Ismoilov",
  "Jumayev",
  "Karimov",
  "Komilov",
  "Latipov",
  "Mahmudov",
  "Mirzayev",
  "Nazarov",
  "Odilov",
  "Qodirov",
  "Rahimov",
  "Rasulov",
  "Rustamov",
  "Saidov",
  "Sobirov",
  "Toshmatov",
  "Tursunov",
  "Umarov",
  "Usmonov",
  "Valiyev",
  "Xolmatov",
  "Xudoyberdiyev",
  "Yunusov",
  "Yusupov",
  "Zokirov",
] as const;

const nameCapacity = 2 * femaleFirstNames.length * maleSurnames.length;

export function nextTeacherFixtureName(
  usedNames: Set<string>,
  sequence: { value: number },
): string {
  while (sequence.value < nameCapacity) {
    const index = sequence.value++;
    const female = index % 2 === 0;
    const firstNames = female ? femaleFirstNames : maleFirstNames;
    const firstName = firstNames[Math.floor(index / 2) % firstNames.length];
    // 11 is coprime to 37; adjacent accounts therefore rotate surnames.
    const maleSurname = maleSurnames[(index * 11) % maleSurnames.length];
    const surname = female ? `${maleSurname}a` : maleSurname;
    const displayName = `${firstName} ${surname}`;
    const normalized = displayName.toLocaleLowerCase("uz");
    if (!usedNames.has(normalized)) {
      usedNames.add(normalized);
      return displayName;
    }
  }
  throw new Error("Fictional name pool exhausted.");
}
