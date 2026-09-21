/**
 * Development-only placeholder photos served straight from Unsplash's CDN
 * (no API key needed for direct photo URLs). Every id below was verified to
 * resolve with a 200 AND visually spot-checked to match its label. Swap for
 * real FastInfo photography once the admin media library is populated.
 */
function unsplash(id: string, width: number, height: number, quality = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`;
}

export const demoPhotoIds = {
  phoneOnDesk: "1511707171634-5f897ff02aa9",
  smartphoneFlat: "1573148195900-7845dcb9b127",
  smartphoneHand: "1610792516307-ea5acd9c3b00",
  smartphoneAngle: "1574944985070-8f3ebc6b79d2",
  macbookCode: "1517336714731-489689fd1ca8",
  macbookDesk: "1498050108023-c5249f4df085",
  headphonesOne: "1585298723682-7115561c51b7",
  headphonesTwo: "1505740420928-5e560c06d30e",
  headphonesThree: "1484704849700-f032a568e944",
  earbudsOne: "1572569511254-d8f925fe2cbb",
  earbudsTwo: "1600294037681-c80b4cb5b434",
  accessoriesFlatlay: "1590658268037-6bf12165a8df",
  phoneScreenRepair: "1585060544812-6b45742d762f",
  usbDrive: "1512686096451-a15c19314d59",
  usbAdapter: "1546027658-7aa750153465",
  chargerCable: "1601524909162-ae8725290836",
  cableCoiled: "1585079542156-2755d9c8a094",
  computerAccessories: "1556742049-0cfed4f6a45d",
  circuitTech: "1487014679447-9f8336841d58",
  laptopTech: "1550745165-9bc0b252726f",
  techHeroCircuit: "1518770660439-4636190af475",
  keyboardTech: "1607083206968-13611e3d76db",
  techWorkspace: "1497215728101-856f4ea42174",

  officeDesk: "1521791136064-7986c2920216",
  printerDevice: "1625961332771-3f40b0e2bdcf",
  typingKeyboard: "1450101499163-c8848c66ca85",
  laptopCode: "1497032628192-86f99bcd76bc",
  workspaceOverhead: "1454165804606-c3d57bc86b40",
  businessDocuments: "1553877522-43269d4ea984",
  meetingDocuments: "1554224155-6726b3ff858f",
  officeWorker: "1517245386807-bb43f82c33c4",
  meetingRoom: "1519389950473-47ba0277781c",
  businessOffice: "1478147427282-58a87a120781",

  cameraGear: "1502920917128-1aa500764cbd",
  cameraNature: "1558618666-fcd25c85cd64",

  weddingOne: "1519741497674-611481863552",
  weddingRings: "1606800052052-a08af7148866",
  weddingCouple: "1465495976277-4387d4b0b4c6",
  weddingThree: "1511285560929-80b456fea0bc",
  weddingFour: "1606216794074-735e91aa2c92",

  eventParty: "1519167758481-83f550bb49b3",
  eventCrowd: "1464366400600-7168b8af9bc3",
  eventConcert: "1492684223066-81342ee5ff30",
  eventPhotography: "1530103862676-de8c9debad1d",
  eventBirthday: "1496843916299-590492c751f4",
  eventTwo: "1531058020387-3be344556be6",
  eventThree: "1607082348824-0a96f2a4b9da",
  eventFour: "1547153760-18fc86324498",
  eventFive: "1587440871875-191322ee64b0",
  portraitOne: "1487412720507-e7ab37603c6f",
  portraitTwo: "1600180758890-6b94519a8ba6",
  eventSix: "1523301343968-6a6ebf63c672",
  eventSeven: "1583939003579-730e3918a45a",
  eventEight: "1606216794074-735e91aa2c92",
  eventNine: "1522673607200-164d1b6ce486",
  eventTen: "1487956382158-bb926046304a",
  eventEleven: "1550005809-91ad75fb315f",
  eventTwelve: "1445205170230-053b83016050",
  eventThirteen: "1520333789090-1afc82db536a",
  eventFourteen: "1533090161767-e6ffed986c88",
  eventFifteen: "1495474472287-4d71bcdd2085",
} as const;

export type DemoPhotoKey = keyof typeof demoPhotoIds;

export function demoImage(key: DemoPhotoKey, width: number, height: number) {
  return unsplash(demoPhotoIds[key], width, height);
}
