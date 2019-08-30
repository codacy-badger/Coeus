import mongoose from 'mongoose'
const faker = require('faker')
const { createHash } = require('crypto');

// Returns a predictable ObjectId based on input name
const getObjectId = name => {
  const hash = createHash('sha1')
    .update(name, 'utf8')
    .digest('hex');

  return new mongoose.Types.ObjectId(hash.substring(0, 24));
};


 const aircrafts = ["TC-JLS",   "TC-JLT",   "TC-JLU",   "TC-JLV",   "TC-JLY",   "TC-JLZ",   "TC-JPH",   "TC-JPI",   "TC-JPJ",   "TC-JPK",   "TC-JPL",   "TC-JPM",   "TC-JPN",   "TC-JPO",   "TC-JPP",   "TC-JPR",   "TC-JPS",   "TC-JPT",   "TC-JUE",   "TC-JUF",   "TC-JUG",  "TC-JUI",   "TC-JUK",   "TC-JMH",   "TC-JMI",   "TC-JMJ",   "TC-JMK",   "TC-JML",   "TC-JMM",   "TC-JMN",   "TC-JRA",   "TC-JRB",   "TC-JRC",   "TC-JRD",   "TC-JRE",   "TC-JRF",  "TC-JRG",   "TC-JRH",   "TC-JRI",  "TC-JRJ",   "TC-JRK",   "TC-JRL",   "TC-JRM",   "TC-JRN",   "TC-JRO",   "TC-JRP",   "TC-JRR",   "TC-JRS",   "TC-JRT",   "TC-JRU",   "TC-JRV",   "TC-JRY",  "TC-JRZ",   "TC-JSA", "TC-JSB",  "TC-JSC",  "TC-JSD",  "TC-JSE",  "TC-JSF",  "TC-JSG",  "TC-JSH",  "TC-JSI",  "TC-JSJ",  "TC-JSK",  "TC-JSL",  "TC-JSM",  "TC-JSN",  "TC-JSO",  "TC-JSP",  "TC-JSR",  "TC-JSS",  "TC-JST",  "TC-JSU", "TC-JSV",  "TC-JSY", "TC-JSZ",  "TC-JTA",  "TC-JTD",  "TC-JTE",  "TC-JTF",  "TC-JTG",  "TC-JTH",  "TC-JTI",  "TC-JTJ",  "TC-JTK",  "TC-JTL",  "TC-JTM",  "TC-JTN",  "TC-JTO",  "TC-JTP",  "TC-JTR",  "TC-LSA",  "TC-LSB",  "TC-LSC",  "TC-LSD",  "TC-LSE",  "TC-LSF",  "TC-LSG",  "TC-LSH",  "TC-LSJ",  "TC-LSK",  "TC-LSL",  "TC-LSM",  "TC-LSN",  "TC-LSO",  "TC-LSP",  "TC-LSR",  "TC-LSS",  "TC-JCI",  "TC-JDO",  "TC-JDP",  "TC-JDR",  "TC-JDS",  "TC-JIL",  "TC-JIM",  "TC-JIN",  "TC-JIO",  "TC-JIP",  "TC-JIR",  "TC-JIS",  "TC-JIT",  "TC-JIZ",  "TC-JNA", "TC-JNB",  "TC-JNC",  "TC-JND",  "TC-JNE",  "TC-JOO",  "TC-JOU",  "TC-JOV",  "TC-JOY",  "TC-JOZ" , "TC-LNA" , "TC-LNB"  ,"TC-LOH" , "TC-LOI" , "TC-JNH" , "TC-JNI" , "TC-JNJ" , "TC-JNK" , "TC-JNL"  ,"TC-JNM" , "TC-JNN" , "TC-JNO" , "TC-JNP" , "TC-JNR" , "TC-JNS",  "TC-JNT",  "TC-JNZ" , "TC-JOA" , "TC-JOB"  ,"TC-JOD" , "TC-JOE" , "TC-JOF"  ,"TC-JOG"  ,"TC-JOH" , "TC-JOI"  ,"TC-JOJ",  "TC-JOK",  "TC-JOL" , "TC-JOM" , "TC-LNC" , "TC-LND" , "TC-LNE",  "TC-LNF" , "TC-LNG" , "TC-LOA" , "TC-LOB" , "TC-LOC"  ,"TC-LOD" , "TC-LOE" , "TC-LOF" , "TC-LOG"  ,"TC-LOJ" , "TC-LOK" , "TC-LOL" , "TC-LCA" , "TC-LCB" , "TC-LCC"  ,"TC-LCD"  ,"TC-LCE" , "TC-LCF" , "TC-LCG" , "TC-LCH" , "TC-LCI" , "TC-LCJ" , "TC-LCK"  ,"TC-LCL",  "TC-LCM" ,"TC-LCN",  "TC-LCO" , "TC-LCP", "TC-LCR" , "TC-LCS" , "TC-LCT" , "TC-LYA",  "TC-LYB" , "TC-LYC" , "TC-LYD" , "TC-LYE",  "TC-JKO" , "TC-JFL"  ,"TC-JFM" , "TC-JFU"  ,"TC-JFV" , "TC-JGA" , "TC-JGC" , "TC-JGD" , "TC-JGG" , "TC-JGI"  ,"TC-JGR"  ,"TC-JGS" , "TC-JGT",  "TC-JGU" , "TC-JGV" , "TC-JGY",  "TC-JGZ" , "TC-JHA" , "TC-JHB" , "TC-JHC"  ,"TC-JHD" ," TC-JHE" , "TC-JHF" , "TC-JHK" ," TC-JHL" , "TC-JHM" , "TC-JHN"  ,"TC-JHO" , "TC-JHP" , "TC-JHR" , "TC-JHS" , "TC-JHT" , "TC-JHU"  ,"TC-JHV" , "TC-JHY" , "TC-JHZ" , "TC-JVA" , "TC-JVB" , "TC-JVC"  ,"TC-JVD" , "TC-JVE" , "TC-JVF" , "TC-JVG" , "TC-JVH" , "TC-JVI" , "TC-JVJ" , "TC-JVK" , "TC-JVL" , "TC-JVM" , "TC-JVN" , "TC-JVO" , "TC-JVP"  ,"TC-JVR" , "TC-JVS" , "TC-JVT" , "TC-JVU" , "TC-JVV"  ,"TC-JVY" , "TC-JVZ" , "TC-JZE",  "TC-JZF"  ,"TC-JZG"  ,"TC-JZH" , "TC-JYA" , "TC-JYB",  "TC-JYC" , "TC-JYD" , "TC-JYE" , "TC-JYF",  "TC-JYG", "TC-JYH"  ,"TC-JYI" , "TC-JYJ"  ,"TC-JYL" , "TC-JYM"  ,"TC-JYN" , "TC-JYO" , "TC-JYP"  ,"TC-LJL" , "TC-LJM" , "TC-LJN" , "TC-LJO" , "TC-LJP" , "TC-JJE" , "TC-JJF"  ,"TC-JJG",  "TC-JJH" , "TC-JJI",  "TC-JJJ",  "TC-JJK" , "TC-JJL" , "TC-JJM" , "TC-JJN" , "TC-JJO" , "TC-JJP",  "TC-JJR" , "TC-JJS" , "TC-JJT" , "TC-JJU" , "TC-JJV"  ,"TC-JJY" , "TC-JJZ" , "TC-LJA" , "TC-LJB" , "TC-LJC"  ,"TC-LJD",  "TC-LJE" , "TC-LJF" , "TC-LJG" , "TC-LJH",  "TC-LJI" , "TC-LJJ" , "TC-LJK" , "TC-LKA",  "TC-LKB" , "TC-LKC" , "TC-LLA" , "TC-LLB" , "TC-LLC" , "TC-LLD" , "TC-LLF"  ];

module.exports = aircrafts.map(registration => ({
    _id: getObjectId(registration),
    registration,
    manufacturer: faker.random.arrayElement(["Airbus","Boeing"]),
    model: faker.random.arrayElement(["A310-300F","A310-600F","A319-132/100","A320-200","A321-200","A330-200","A330-200F","A330-300","A330-F","A340","737-700","737-800","737-900","737-800 MAX","737-900 MAX","737-900ER","737-900ER","777-F","777-300ER","787-900","747-400F"]),
    msn: faker.random.number({min:120, max:5000}),
    weightVariant: faker.random.number({min:0, max:10}),
    year: faker.random.number({min:1994, max:2019}),
    totalFlightCycle: faker.random.number({min:1999, max:12000}),
    totalFlightHour: faker.random.number({min:14000, max:22000}),
    operator: 'Turkish Airlines',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
}))