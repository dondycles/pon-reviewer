"use client";
import Question from "@/components/question";

const questions = [
  {
    question: "Chuck used on turret lathe is",
    choices: [
      "collet chuck",
      "four jaw self centering chuck",
      "Magnetic Chuck",
      "Three jaw independent chuck",
    ],
    answer: "Three jaw independent chuck",
  },
  {
    question: "Angle plate is used for",
    choices: [
      "cutting gears in a shaper",
      "cutting gears in a milling",
      "cutting tapers in a lathe",
      "fixing job cut angles is grinder",
    ],
    answer: "cutting gears in a shaper",
  },
  {
    question:
      "For machining the flange of 90 elbow on a lathe, which of the following device is used?",
    choices: ["Angle plate", "Catch Plate", "Face Plate", "Lathe plate"],
    answer: "Face Plate",
  },
  {
    question: "Angle Plate is used for",
    choices: [
      "cutting gears in a shaper",
      "cutting gears in a milling",
      "cutting tapers in a lathe",
      "fixing job cut angles is a grinder",
    ],
    answer: "cutting gears in a shaper",
  },
  {
    question: "A sine bar can not be used without a/an",
    choices: ["angle gage", "micrometer", "slip gage", "vernier caliper"],
    answer: "angle gage",
  },
  {
    question:
      "The operation of finishing a drilled hole to the correct size is known as",
    choices: ["counting boring", "counter sinking", "reaming", "spot facing"],
    answer: "reaming",
  },
  {
    question: "Carbon steel drill should be operated at",
    choices: [
      "speed less than that when using a high speed drill",
      "speed greater than that when using a high speed drill",
      "the different speed as that when using high speed drill",
      "the same speed as that when using a high speed drill",
    ],
    answer: "speed greater than that when using a high speed drill",
  },
  {
    question:
      "When cutting material in a lathe, the harder the material being cut, the tool bit should have",
    choices: [
      "less side rake",
      "more side rake",
      "more top rake",
      "no side rake",
    ],
    answer: "less side rake",
  },
  {
    question: "On xx heavy pipe the extra metal is added in the",
    choices: [
      "outside",
      "inside",
      "half on the inside, half on the outside",
      "three quarters on the outside, one quarter on the inside",
    ],
    answer: "inside",
  },
  {
    question: "Valve seats are usually:",
    choices: ["screwed in", "dropped in", "pressure in", "A or C"],
    answer: "A or C",
  },
  {
    question: "When grinding in valves the disc is secured to the stem by:",
    choices: [
      "inserting a cotter pin",
      "placing emery cloth between stem and disc",
      "welding",
      "A or B",
    ],
    answer: "A or B",
  },
  {
    question:
      "A fresh-water tank is located at the top. What will the pressure on it outlet in the engine room 50’ below the tank?",
    choices: ["20 psi", "21.7 psi", "23 psi", "25 psi"],
    answer: "21.7 psi",
  },
  {
    question: "In a duplex reciprocating pump:",
    choices: [
      "the slide valve for the one cylinder is controlled in the piston of the other cylinder",
      "both slide valves operate simultaneously",
      "each slide valve is controlled by its own piston rod",
      "one slide valve operates the other slide valve",
    ],
    answer:
      "the slide valve for the one cylinder is controlled in the piston of the other cylinder",
  },
  {
    question: "The jerky operation of a reciprocating pump may be caused by",
    choices: [
      "small leaks in the suction line",
      "suction valve only partially open",
      "dirty suction valve",
      "any of the above",
    ],
    answer: "any of the above",
  },
  {
    question:
      "It is used in the production of the flat surface on pieces two large or too heavy to hold in a shaper.",
    choices: ["Grinder", "Planer", "Shaper", "Shaver"],
    answer: "Planer",
  },
  {
    question:
      "A machine tool used to produce a variety of surface of surfaces by using a circular type cutter with multiple teeth called",
    choices: [
      "Broaching machine",
      "Grinding",
      "Lathe machine",
      "Milling machine",
    ],
    answer: "Milling machine",
  },
  {
    question:
      "Cutting tool used to finish internal and external surfaces by the use of cutter called a broach, which has a series of cutting edges of teeth.",
    choices: ["Broaching machine", "Lathe machine", "Planer", "Shaper"],
    answer: "Broaching machine",
  },
  {
    question: "Group of thin steel strips used for measuring clearances.",
    choices: ["Tachometer", "Micrometer", "Feeler gage", "Caliper"],
    answer: "Feeler gage",
  },
  {
    question:
      "Bind of chuck, which should not be used where accuracy desired called",
    choices: [
      "Collet chuck",
      "Four jaw chuck",
      "Magnetic chuck",
      "Universal chuck",
    ],
    answer: "Universal chuck",
  },
  {
    question:
      "The process used to retard compression thrust on iron pipe and fitting is called:",
    choices: ["Timming", "Soldering", "Galvanizing", "Sulphurizing"],
    answer: "Galvanizing",
  },
  {
    question:
      "The system used for breaking scale from the evaporator coils while the evaporator is in operation is called:",
    choices: ["Recirculating", "Blowing-down", "Cracking-off", "Dumping"],
    answer: "Cracking-off",
  },
  {
    question: "The coils in the evaporator are attached to the headers by:",
    choices: [
      "Pipe nipples",
      "Union – type fitting",
      "Welding",
      "Bolted flanges",
    ],
    answer: "Union – type fitting",
  },
  {
    question:
      "When distilling salt water the cooling – water discharge from the distiller is fed back to the evaporator as feedwater:",
    choices: [
      "To cut down on the amount of cooling water needed",
      "To prevent n excess amount of cooling water from being discharge to the bilges",
      "To supply hot water to the evaporator for more economical operation",
      "None of the above",
    ],
    answer:
      "To supply hot water to the evaporator for more economical operation",
  },
  {
    question: "An 'offset' in pipe fitting refers to:",
    choices: [
      "A cut-off running at right angles to the original piping",
      "Two pipes running parallel to each other",
      "A bend in the pipe",
      "Two sizes of pipe in the same run",
    ],
    answer: "A bend in the pipe",
  },
  {
    question:
      "If a piston-type flush valve is not operating properly, the most likely cause would be:",
    choices: [
      "A plugged by – pass hole",
      "A cracked diaphragm",
      "A stuck pilot valve",
      "Any of the above",
    ],
    answer: "A plugged by – pass hole",
  },
  {
    question: "Before installing a new flange gasket be sure that the:",
    choices: [
      "Flange faces are painted",
      "Isolating valves are open",
      "Flange faces are absolutely clean",
      "Old gasket is in place",
    ],
    answer: "Flange faces are absolutely clean",
  },
  {
    question: "What is a standard wire gage:",
    choices: [
      "#10 larger",
      "#25 is smaller than #20",
      "# 1 is smaller than # 2",
      "# 30 is larger than # 25",
    ],
    answer: "#25 is smaller than #20",
  },
  {
    question:
      "Which of the following tools would be most useful when taking leads on bearings",
    choices: ["Dividers", "Outside calipers", "Micrometer", "Center gage"],
    answer: "Micrometer",
  },
  {
    question: "The wrench size for a ¼” nut is:",
    choices: ["1-1/4", "1-1/2", "3/4", "10/24"],
    answer: "1-1/4",
  },
  {
    question: "Which of the following would cause hot bearings?",
    choices: [
      "Improper oil",
      "Dirt in oil",
      "Improper alignment",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "Melting point of Babbit is approximately:",
    choices: ["1000 deg. F", "650 deg. F", "750 deg. F", "500 deg. F"],
    answer: "650 deg. F",
  },
  {
    question: "What is pouring Babbit in:",
    choices: [
      "Can be poured in several pourings",
      "Must be poured all at one time",
      "Can be done at intervals",
      "Must be done in cool place",
    ],
    answer: "Must be poured all at one time",
  },
  {
    question:
      "A machine tool, which is very similar to a shaper except the ram reciprocals vertically rather that horizontally",
    choices: ["Lathe", "Grinder", "Planer", "Slotter"],
    answer: "Slotter",
  },
  {
    question:
      "The operation of machining the end of a work piece to make a square with the axis.",
    choices: ["Buffing", "Honing", "Lapping", "Squaring"],
    answer: "Squaring",
  },
  {
    question:
      "The operation of enlarging a hole by means of an adjustable cutting tool with only one cutting edge.",
    choices: ["Boring", "Broaching", "Drilling", "Milling"],
    answer: "Boring",
  },
  {
    question:
      "It is used to true and align machine tools fixtures and works is at and inspect size trueness of finished work, and to compare measurements either heights or depths or many other measurements.",
    choices: ["Dial Gage", "Dial Indicator", "Tachometer", "Speedometer"],
    answer: "Dial Indicator",
  },
  {
    question: "A tool used for measuring diameters.",
    choices: ["Caliper", "Manometer", "Tachometer", "Pyrometer"],
    answer: "Caliper",
  },
  {
    question:
      "A process of forming metals by the use of dies after the metal is forced to its plastic range.",
    choices: ["Casting", "Forging", "Rolling", "Turning"],
    answer: "Rolling",
  },
  {
    question:
      "Which of the following does not have to be lubricated when drilling?",
    choices: ["Steel", "Brass", "Monel", "Tool Steel"],
    answer: "Brass",
  },
  {
    question:
      "The tool to use when cutting a hole in the side of a round piece of metal is called a:",
    choices: ["Vine", "Jaw holder", '"V" block', "Chuck"],
    answer: '"V" block',
  },
  {
    question: "When measuring a drill for size measure across the:",
    choices: ["Margin", "Flutes", "Shank", "Point"],
    answer: "Margin",
  },
  {
    question: "N.C. stands for:",
    choices: ["Neutral cut", "National coarse", "National cut", "Not center"],
    answer: "National coarse",
  },
  {
    question: "N.F. stands for:",
    choices: ["National file", "National fine", "Neutral file", "Not found"],
    answer: "National fine",
  },
  {
    question:
      "The tool used in precision work to smooth or enlarge holes is called a:",
    choices: ["round out", "drift pin", "reamer", "protractor"],
    answer: "reamer",
  },
  {
    question:
      "Which of the following chisels would be used for cutting oil grooves?",
    choices: [
      "diamond-point chisel",
      "cold chisel",
      "round-nose chisel",
      "hot chisel",
    ],
    answer: "round-nose chisel",
  },
  {
    question:
      "A mechanism, which usually does the indexing in a machine tool is called:",
    choices: ["dividing head", "indexing", "slotter", "universal chuck"],
    answer: "dividing head",
  },
  {
    question:
      "Recommended best cutting angle of drill for work on steel or cast iron is ______ degrees",
    choices: ["48", "50", "59", "63"],
    answer: "59",
  },
  {
    question:
      "What is the common shop practice to prevent soldering from running away from surface to be joined?",
    choices: [
      "All of these",
      "Introduce around the work rolled wet cloth",
      "Put asbestos sheeting around the work",
      "Surround the work with clay",
    ],
    answer: "All of these",
  },
  {
    question:
      "A machinery operation whereby done with the work accurately fastened has a reciprocating motion and the tool head is stationary is called:",
    choices: ["planning", "reaming", "shaping", "turning"],
    answer: "planning",
  },
  {
    question: "What is the difference between the shaper and a planer?",
    choices: [
      "The shaper can perform slotting operation while the planer cannot",
      "The shaper handles large pieces while the planer handles only small pieces",
      "The tool of the shaper moves while the planer is stationary",
      "The tool of the shaper moves in reciprocating motion while the tool in the planer moves in rotary motion.",
    ],
    answer: "The tool of the shaper moves while the planer is stationary",
  },
  {
    question: "Test sometimes referred to as upsetting test called",
    choices: ["bend", "crush", "flange", "flaring"],
    answer: "bend",
  },
  {
    question: "Valve stem packing is measured from thin:",
    choices: [
      "O. D. of the valve stem to the bottom of the packing gland",
      "Top of the packing gland to the bottom of the gland",
      "O. D. of the valve stem to the I. D. of the packing box",
      "I. D. of the valve stem to the to the bottom of the gland",
    ],
    answer: "O. D. of the valve stem to the I. D. of the packing box",
  },
  {
    question: "Tool used to cut threads on pipe is called a:",
    choices: ["pipe tool", "pipe stock", "pipe vise", "pipe cutter"],
    answer: "pipe stock",
  },
  {
    question:
      "The pipe fitting which has two openings and provides a turn of 90 deg. Is called:",
    choices: ["an elbow", "a toe", "a coupling", "a union"],
    answer: "an elbow",
  },
  {
    question: "A plug cock offers:",
    choices: [
      "more resistance to flow than a globe valve",
      "the same resistance to flow as a globe valve",
      "less resistance to flow than a globe valve",
      "the same resistance to flow as a angle valve",
    ],
    answer: "less resistance to flow than a globe valve",
  },
  {
    question:
      "The most common flux to use when soldering brass, copper or tin is:",
    choices: ["hallow", "rosin", "borax", "salt ammonia"],
    answer: "rosin",
  },
  {
    question: "One turn of the screw on a micrometer moves the spindle:",
    choices: [".25", ".205", ".0205", ".2005"],
    answer: ".0205",
  },
  {
    question: "The process used to retard corrosion on iron pipe is called:",
    choices: ["soldering", "annealing", "tempering", "galvanizing"],
    answer: "galvanizing",
  },
  {
    question: "Which of the following tools does not belong to the group?",
    choices: ["Dividers", "Double VEE block", "Caliper", "Trammel"],
    answer: "Double VEE block",
  },
  {
    question:
      "In machine shop had forging operation of lengthening a piece of stock while reducing the cross-sectional area of work is called:",
    choices: ["bloating", "draining", "spreading", "upsetting"],
    answer: "upsetting",
  },
  {
    question:
      "Which of the following services is not considered to be a work of a machinist?",
    choices: ["grinding", "honing", "overhauling", "reboring"],
    answer: "overhauling",
  },
  {
    question:
      "Common defects encountered in the foundry shop steel casting operation and also in welding practices",
    choices: ["Blow / pin holes", "Cold shot", "Cracks", "Parting line"],
    answer: "Blow / pin holes",
  },
  {
    question:
      "Lathe operator to remove the taper shank from the taper hole drift. It is also called:",
    choices: ["chuck taper", "Morse taper", "tapered key", "tong"],
    answer: "Morse taper",
  },
  {
    question: "Before drilling a hole in a piece of metal, It should be",
    choices: ["mark with chalk", "center-punch", "scribed", "protracted"],
    answer: "center-punch",
  },
  {
    question: "A tap or die marked ¼-20 indicates:",
    choices: [
      "¼ radius – 20 cm. long",
      "¼ radian – 20 threads per in.",
      "¼ diameter – 20 threads per in.",
      "¼ turn – 20 times",
    ],
    answer: "¼ diameter – 20 threads per in.",
  },
  {
    question:
      "After a piece of piece of pipe has been cut, the hole is cleaned out with a:",
    choices: ["piper reamer", "pipe cleaner", "pipe taper", "hole cleaner"],
    answer: "piper reamer",
  },
  {
    question: "The tool used for cutting pipe threads is called a:",
    choices: [
      "pipe cutter",
      "pipe stock and die",
      "pipe threader",
      "pipe ratchet cutter",
    ],
    answer: "pipe stock and die",
  },
  {
    question:
      "The tool used when working with larger sizes of pipe is called a:",
    choices: ["chain pipe wrench", "chain tongs", "chain holder", "A or B"],
    answer: "A or B",
  },
  {
    question:
      "The tool used when preparing to put fittings on copper tubing is called a:",
    choices: [
      "tube spreader",
      "flaring tool",
      "tube retarder",
      "tube countersink",
    ],
    answer: "flaring tool",
  },
  {
    question: "Which of the following is not a standard thread form?",
    choices: ["Square", "American national", "Double Flute", "60 deg. Sharp V"],
    answer: "Double Flute",
  },
  {
    question:
      "When turning a piece of round metal in a lathe, the front clearance should be smaller for:",
    choices: [
      "large-diameter cutting",
      "small-diameter cutting",
      "cutting angles",
      "none of the above",
    ],
    answer: "small-diameter cutting",
  },
  {
    question:
      "When cutting material in a lathe, the harder the material being cut, the tool bit should have:",
    choices: [
      "more side rake",
      "less side rake",
      "more top rake",
      "no side rake",
    ],
    answer: "less side rake",
  },
  {
    question: "Knurling is done to:",
    choices: [
      "smooth material",
      "polish material",
      "roughen material",
      "sharpen material",
    ],
    answer: "roughen material",
  },
  {
    question:
      "Removing the sharp edges from a piece of stock is referred to as:",
    choices: ["knurling", "chamfering", "planning", "turning"],
    answer: "chamfering",
  },
  {
    question: "Carbon steel drills should be operated at:",
    choices: [
      "speeds greater than that when using a high-speed drill",
      "speeds less than that when using a high-speed drill",
      "the same speed as that when using a high-speed drill",
      "none of the above",
    ],
    answer: "speeds less than that when using a high-speed drill",
  },
  {
    question:
      "When extreme outer corners of the cutting edges of a drill wear away too rapidly, it is an indication of:",
    choices: [
      "not enough speed",
      "too much rake angle",
      "too high speed",
      "B or C",
    ],
    answer: "B or C",
  },
  {
    question:
      "It is an operation of stretching or spreading over the metal by means of the plane of the hammer.",
    choices: ["Bending", "Peening", "Swaging", "Upsetting"],
    answer: "Peening",
  },
  {
    question: "The good quality of a measuring tool:",
    choices: [
      "should be easy to handle",
      "should be easy to read",
      "should be wear resistance",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "The flatness of surface can be checked:",
    choices: [
      "by using straight edge",
      "by using surface plate",
      "by using dial test indicator",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "A holding device which is used to hold or grip work piece, while filing, chipping or any other bench work or while machining or drilling them",
    choices: ["clamp", "grid", "pressed", "vise"],
    answer: "vise",
  },
  {
    question:
      "A multi pointed hand cutting tool used to remove material from metallic and nonmetallic work pieces to match with drawing, shape and size.",
    choices: ["Cold chisel", "File", "Hacksaw", "Hammer"],
    answer: "File",
  },
  {
    question:
      "A side-cutting tool used for accurately finishing the straight or tapered holes already drilled or bored.",
    choices: ["Peering", "Reamer", "Swaging", "Tapping"],
    answer: "Reamer",
  },
  {
    question: "If the angle on a drill is less than 59 deg.:",
    choices: [
      "the drill will make a large hole",
      "the drill will make a smaller hole",
      "the hole will take longer to drill and more power is required to drive the drill",
      "the drill will not center properly",
    ],
    answer:
      "the hole will take longer to drill and more power is required to drive the drill",
  },
  {
    question:
      "Soda added to water is used for cooling instead of plain water because:",
    choices: [
      "it reduces the amount of heat generated",
      "it improves the finish",
      "it overcomes rusting",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "If a drill speed is too great, it will:",
    choices: ["cut faster", "lose its temper", "cut slower", "not cut"],
    answer: "lose its temper",
  },
  {
    question: "The lip clearance of a drill should be approximately:",
    choices: [
      "20 deg. – 25 deg.",
      "5 deg. – 10 deg.",
      "12 deg. – 15 deg.",
      "15 deg. – 20 deg.",
    ],
    answer: "12 deg. – 15 deg.",
  },
  {
    question: "If the cutting edges of a drill are cut at different angles:",
    choices: [
      "the drill will not cut",
      "the hole will be larger than the drill",
      "the hole will be smaller than the drill",
      "none of the above",
    ],
    answer: "the hole will be larger than the drill",
  },
  {
    question: "The correct cutting angle on a drill for ordinary work is:",
    choices: ["45 deg.", "50 deg.", "59 deg.", "65 deg."],
    answer: "59 deg.",
  },
  {
    question:
      "Which of the following gives greater hardness, cutting toughness and fine grain structure?",
    choices: ["Chromium", "Nickel", "Tungsten", "Vanadium"],
    answer: "Chromium",
  },
  {
    question: "It is a process to impart maximum hardness to the steel part.",
    choices: ["Annealing", "Hardening", "Normalizing", "Tempering"],
    answer: "Hardening",
  },
  {
    question:
      "The size by which it is referred to as a matter of convenience called:",
    choices: ["actual size", "basic size", "effective size", "nominal size"],
    answer: "nominal size",
  },
  {
    question:
      "The relation between two mating parts with reference to ease the assembly is called:",
    choices: ["allowance", "clearance", "tolerance", "fits"],
    answer: "fits",
  },
  {
    question:
      "It is an operation of finishing cylindrical surfaces to a fine degree of accuracy by means of abrasive sticks.",
    choices: ["Honing", "Lapping", "Planing", "Shaping"],
    answer: "Honing",
  },
  {
    question:
      "It is a device, which holds the job in position and guides the cutting tool.",
    choices: ["clamp", "grip", "jig", "vise"],
    answer: "jig",
  },
  {
    question: "In referring to threads, “pitch” is:",
    choices: [
      "the distance of the full length of the thread",
      "the distance from a point on one thread to a corresponding point on the next thread measured parallel to the axis",
      "the distance from the top of one thread to the bottom of the next thread",
      "the distance from the bottom of a head on a bolt to the first thread",
    ],
    answer:
      "the distance from a point on one thread to a corresponding point on the next thread measured parallel to the axis",
  },
  {
    question:
      "A tool bit for cutting an American National thread should be ground with a:",
    choices: [
      "45 deg. angle",
      "90 deg. angle",
      "60 deg. angle",
      "30 deg. angle",
    ],
    answer: "60 deg. angle",
  },
  {
    question:
      "An approximate safe rule for cutting new piston rings for steam pumps is to make the ring:",
    choices: [
      ".002” between piston and cylindrical for each inch diameter of piston",
      ".001” between piston and cylinder for each inch diameter",
      ".010 between piston and cylinder for each inch diameter of piston",
      ".0001” between piston and cylinder for each inch diameter of piston",
    ],
    answer: ".001” between piston and cylinder for each inch diameter",
  },
  {
    question:
      "An approximate safe rule for cutting new piston rings for steam pumps is to make the ring:",
    choices: [
      "1/32” larger in diameter per inch diameter of cylinder",
      "1/16” larger in diameter than that of the cylinder",
      "1/16” larger in diameter per inch diameter of cylinder",
      ".005” larger in diameter per inch diameter of cylinder",
    ],
    answer: "1/16” larger in diameter per inch diameter of cylinder",
  },
  {
    question:
      "The gap clearance for new piston rings for steam pumps should be approximately:",
    choices: [
      ".003” for each inch diameter of cylinder",
      ".001” for each inch diameter of cylinder",
      ".010” for each inch diameter of cylinder",
      ".050” for each inch diameter of cylinder",
    ],
    answer: ".003” for each inch diameter of cylinder",
  },
  {
    question: "What does 3/8 – 16 mean to you?",
    choices: [
      "16 pieces, 3/8 “ long",
      "gear with 16 teeth and a 3/8” arbor hole",
      "3/8” square, 16” long",
      "3/8” diameter. 16 threads per inch",
    ],
    answer: "3/8” diameter. 16 threads per inch",
  },
  {
    question: "When using a drill press the work should be held with:",
    choices: ["the hand", "a gloved hand", "a vise or clamp", "pliers"],
    answer: "a vise or clamp",
  },
  {
    question: "Tapered shanks are used on large drill presses so that:",
    choices: [
      "the drill can be centered more easily",
      "the drill can be easily forced out of the sleeve with a drift",
      "the shank will not turn when cutting",
      "the shank can be reground when worn",
    ],
    answer: "the drill can be easily forced out of the sleeve with a drift",
  },
  {
    question: "Which of the following is not a common drill shank?",
    choices: ["straight", "taper", "fluted", "bit"],
    answer: "fluted",
  },
  {
    question: "The cutting angle on a drill for drilling mild steel should be:",
    choices: ["39 deg.", "49 deg.", "59 deg.", "69 deg."],
    answer: "59 deg.",
  },
  {
    question: "A device used to fix two or more parts.",
    choices: ["clamp", "fastener", "fixtures", "jigs"],
    answer: "fastener",
  },
  {
    question: "A machine element inserted parallel to the axis of a shaft.",
    choices: ["cutter", "fastener", "key", "reamer"],
    answer: "key",
  },
  {
    question:
      "A machine element inserted at right angle to the axis of shaft is known as",
    choices: ["clamp", "cutter", "fastener", "key"],
    answer: "cutter",
  },
  {
    question: "The process of extracting iron in a blast furnace is called",
    choices: ["casting", "manufacturing", "smelting", "sintering"],
    answer: "smelting",
  },
  {
    question: "Which of the following is a product of blast furnace?",
    choices: ["cast iron", "gray iron", "pig iron", "wrought iron"],
    answer: "pig iron",
  },
  {
    question:
      "A product of paddling furnace which contains less than 0.104 carbon, is called",
    choices: ["cast iron", "gray cast iron", "pig iron", "wrought iron"],
    answer: "wrought iron",
  },
  {
    question: "Which of the following is a property of wrought iron?",
    choices: [
      "brittle",
      "can not be forged",
      "can be easily cast into different shapes",
      "ductile",
    ],
    answer: "ductile",
  },
  {
    question:
      "A piece of stock 8’’ long is 4” diameter on one end and 1” diameter on the other end. The taper per foot is:",
    choices: ["4”", "4 -1/2”", "4 -1/4”", "4 -1/16”"],
    answer: "4 -1/2”",
  },
  {
    question:
      "A piece of stock 8” long is 3” diameter at one end and 1 – ½” diameter at the other end. The taper per inch is:",
    choices: ["½”", "¼”", "3/16”", "5/16”"],
    answer: "3/16”",
  },
  {
    question:
      "A piece of stock 6” long is 2” diameter at one end and is cut with a taper of ½” to the foot. The diameter of the smaller end will be:",
    choices: ["1 – ½’", "1 – ¾’", "1 - ¼’", "2”"],
    answer: "1 – ¾’",
  },
  {
    question:
      "If a piston ring is to be made 1/64” larger in diameter per inch diameter of the cylinder which it is to fit, the required diameter for a piston ring to fit an 8” cylinder will be:",
    choices: ["8 – ¼”", "8 - 1/8”", "8 – 3/16”", "8 – 5/32”"],
    answer: "8 - 1/8”",
  },
  {
    question: "When cutting. A drill will “squeal” due to:",
    choices: [
      "drill being ground improperly",
      "drill being too hot",
      "insufficient lubrication",
      "any of the above",
    ],
    answer: "any of the above",
  },
  {
    question: "“Center drilling” is the operation of:",
    choices: [
      "drilling a center in an odd-shaped piece of metal",
      "drilling and countersinking with one tool",
      "centering with one tool and drilling with another",
      "drilling a center in a piece of stock in a drill press",
    ],
    answer: "drilling and countersinking with one tool",
  },
  {
    question:
      "The type and number of bearings to be used for spindles of machine tool depend on",
    choices: [
      "type of spindle",
      "type of machine tool",
      "load on the ring",
      "load on the bearing",
    ],
    answer: "load on the bearing",
  },
  {
    question:
      "Which of the following has its angle 30 and is used for dotting after marking the lines on general works?",
    choices: ["center punch", "dot punch", "hollow punch", "prick punch"],
    answer: "prick punch",
  },
  {
    question:
      "Which of the following has its angle 60 and is used for dotting after marking the lines on general works?",
    choices: ["center punch", "dot punch", "hollow punch", "prick punch"],
    answer: "dot punch",
  },
  {
    question:
      "Which of the following has its angle 90 and is used to give deep marks for the location of drill?",
    choices: ["center punch", "dot punch", "hollow punch", "prick punch"],
    answer: "center punch",
  },
  {
    question: "It is used on soft metals and non-metals for making holes.",
    choices: ["center punch", "dot punch", "hollow punch", "prick punch"],
    answer: "hollow punch",
  },
  {
    question:
      "Reason why cast iron selected for the manufacture of surface of surface plate",
    choices: [
      "it is cheaper",
      "it is easy for machinery",
      "it has less wear and tear",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "The common measuring tools are",
    choices: [
      "micrometer",
      "steel rule",
      "vernier caliper",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "Which of the following is not a kind of mandrel?",
    choices: ["contraction", "expanded", "extended", "taper"],
    answer: "contraction",
  },
  {
    question:
      "An act of cutting out a piece of metal at a desired shape and size is known as",
    choices: ["blanking", "broaching", "dinking", "slitting"],
    answer: "blanking",
  },
  {
    question:
      "Safety features that must be placed and maintained at machine, black smith welding and foundry shops called",
    choices: [
      "safety goggles",
      "safety notices",
      "safety notices in markers / boards",
      "walkway shops",
    ],
    answer: "safety notices in markers / boards",
  },
  {
    question: "In cutting tool the cutting end can also be generally called",
    choices: ["back rake", "end cutting edge", "nose", "side rake"],
    answer: "nose",
  },
  {
    question:
      "A machine shop equipment that can flatter horizontally, vertically or angular plane called",
    choices: [
      "drill machine",
      "power saw",
      "shaper machine",
      "welding machine",
    ],
    answer: "shaper machine",
  },
  {
    question:
      "Which of the following is an unsafe condition in operating a lathe machine?",
    choices: [
      "operating with safety gloves",
      "wearing a canvass apron",
      "wearing denim pants / safety shoes",
      "wearing safety goggles / hearing aid",
    ],
    answer: "wearing a canvass apron",
  },
  {
    question:
      "The instrument used to remove old packing from packing glands and stuffing boxes are called:",
    choices: [
      "packing tools",
      "packing bits",
      "gland box cleaners",
      "packing screws",
    ],
    answer: "packing tools",
  },
  {
    question:
      "When working on bearing and checking for high spots, it is customary to apply:",
    choices: ["white lead", "red lead", "dykem blue", "Prussian blue"],
    answer: "Prussian blue",
  },
  {
    question:
      "If you wanted to check the face of a pump slide valve or other flat –face valve, you would check for trueness on a:",
    choices: ["flat board", "surface plate", "piece of glass", "bearing plate"],
    answer: "surface plate",
  },
  {
    question: "To keep a metal clean while soldering, one would use a:",
    choices: ["flax", "torch", "flux", "insulated"],
    answer: "flux",
  },
  {
    question: "Before splicing electric wires, they should be:",
    choices: ["tinned", "cleaned and tinned", "soldered", "insulated"],
    answer: "cleaned and tinned",
  },
  {
    question:
      "To check the speed of a motor or other rotary machine, one would",
    choices: ["speed indicator", "micrometer", "tachometer", "A or C"],
    answer: "A or C",
  },
  {
    question: "It is the best instrument for measuring a thousandth of an inch",
    choices: ["Caliper", "Micrometer", "Pyrometer", "Tachometer"],
    answer: "Micrometer",
  },
  {
    question:
      "What tool will be used in making wood pattern in the foundry shop?",
    choices: ["Sand saw", "Drill machine", "Hammer", "Saw and chisel"],
    answer: "Saw and chisel",
  },
  {
    question:
      "Machine tool used for laying straight lines on metal surfaces made of sharp tool steel is called",
    choices: ["divider", "hermaphrodite caliper", "plain scriber", "trammel"],
    answer: "plain scriber",
  },
  {
    question: "A lathe machine threading mechanism is called",
    choices: [
      "anvil",
      "changed stud gear",
      "reverse gear and lever",
      "spindle gear",
    ],
    answer: "spindle gear",
  },
  {
    question:
      "Which of the following is not used to resemble the shape of tool bit?",
    choices: ["center cut", "round nose", "square nose", "thread cutting"],
    answer: "center cut",
  },
  {
    question: "A lathe with multiple cutting stations called:",
    choices: [
      "engine lathe",
      "manual lathe11",
      "semi-manual lathe",
      "turret lathe",
    ],
    answer: "turret lathe",
  },
  {
    question: "Device used to measure accurately speed called",
    choices: ["dial gage", "dial indicator", "speedometer", "tachometer"],
    answer: "tachometer",
  },
  {
    question: "A pipe wrench (Stilleon) is designed for use on:",
    choices: [
      "hexagonal objects",
      "round objects",
      "square objects",
      "flat objects",
    ],
    answer: "round objects",
  },
  {
    question: "Pipe is measured by:",
    choices: [
      "inside diameter",
      "outside diameter",
      "thickness of wall",
      "wire gage",
    ],
    answer: "inside diameter",
  },
  {
    question: "Tubing is measured by:",
    choices: [
      "inside diameter",
      "outside diameter",
      "thickness of wall",
      "wire gage",
    ],
    answer: "outside diameter",
  },
  {
    question: "“Water Hammer” is caused by:",
    choices: [
      "hitting water pipe with hammer",
      "too much water in pipe system",
      "water in steam line",
      "steam in water line",
    ],
    answer: "water in steam line",
  },
  {
    question: "Insulation is used on piping to:",
    choices: [
      "held in heat",
      "held in cold",
      "cut down heat losses",
      "steam in water line",
    ],
    answer: "cut down heat losses",
  },
  {
    question:
      "It is a machine used for the testing of very thin steel or surface layers.",
    choices: ["Charpy test", "Description test", "Izod test", "Rockwell test"],
    answer: "Rockwell test",
  },
  {
    question: "It is a test for pipe used for coiling in sizes 2 inches.",
    choices: ["bend", "crush", "flange", "flaring"],
    answer: "bend",
  },
  {
    question:
      "Milling machine accessories are used to hold milling cutter in the milling machine called:",
    choices: [
      "milling machine arbors",
      "milling machine size",
      "spindle – nose tooling",
      "vertical milling attachment",
    ],
    answer: "milling machine arbors",
  },
  {
    question: "An important accessories of milling machine.",
    choices: [
      "cutters",
      "milling machine vise",
      "ram",
      "vertical milling attachment",
    ],
    answer: "cutters",
  },
  {
    question:
      "The machine, which can flatter surface on horizontal, vertical or angular plane.",
    choices: [
      "drilling machine",
      "lathe machine",
      "power saw",
      "shaper machine",
    ],
    answer: "shaper machine",
  },
  {
    question: "Which of the following is not part on a lathe machine?",
    choices: ["carriage", "fan", "headstock", "tail stock"],
    answer: "fan",
  },
  {
    question: "Which tools does not belong to the group?",
    choices: ["adjustable wrench", "feeler gage", "torque wrench", "vice grip"],
    answer: "feeler gage",
  },
  {
    question: "The tool used to cut threads in a hole is called a:",
    choices: ["top", "tap", "bit", "reamer"],
    answer: "tap",
  },
  {
    question: "Hand taps are provided in sets of three called:",
    choices: [
      "taper, plug and end",
      "short, taper and bottom",
      "taper, plug and bottom",
      "short, medium and long",
    ],
    answer: "taper, plug and bottom",
  },
  {
    question: "Which of the following taps should be used to start a thread?",
    choices: ["plug", "short", "bottom", "taper"],
    answer: "taper",
  },
  {
    question: "When preparing to tap a hole, the size of the drill will be:",
    choices: [
      "equal to the size of the tap",
      "larger than the size of the tap",
      "smaller than the size of the tap",
      "none of the above",
    ],
    answer: "smaller than the size of the tap",
  },
  {
    question: "Pipe taps are:",
    choices: [
      "the same size from end to end",
      "not fluted",
      "tapered",
      "not hardened",
    ],
    answer: "tapered",
  },
  {
    question:
      "When preparing to tap a hole for a pipe fitting the size of the drill will be:",
    choices: [
      "larger than the tap size",
      "equal to the size of the tap",
      "smaller than the tap size",
      "none of the above",
    ],
    answer: "larger than the tap size",
  },
  {
    question:
      "A machine tool used to cut metal parts a lift, medium and large section using a reciprocating hacksaw blade.",
    choices: ["planer", "power saw", "shaper", "tool grinder"],
    answer: "power saw",
  },
  {
    question: "A cold chisel is made of",
    choices: [
      "cast iron",
      "german silver",
      "high carbon silver",
      "high speed steel",
    ],
    answer: "high carbon silver",
  },
  {
    question: "Trimming is a process associated with",
    choices: ["electroplating", "forging", "machining of metals", "press work"],
    answer: "forging",
  },
  {
    question: "A twist drill is specified by",
    choices: [
      "its diameter and lip angle",
      "it shank and diameter",
      "shank, material and diameter",
      "shank, material and flute size",
    ],
    answer: "shank, material and diameter",
  },
  {
    question: "The usual value of helix angle of a drill is:",
    choices: ["30*", "60*", "110*", "120*"],
    answer: "30*",
  },
  {
    question:
      "The helix angle on a high-speed steel twist drill for drilling cast iron if of the order of",
    choices: ["12-22", "24-32", "35-40", "40-45"],
    answer: "24-32",
  },
  {
    question: "Wiping is the process of",
    choices: [
      "applying flux during welding process",
      "cleaning the welded surface after the welding operation is over",
      "connecting load pipes by soldering alloy",
      "low temperature welding",
    ],
    answer: "connecting load pipes by soldering alloy",
  },
  {
    question: "Which of the following is not a cut of file?",
    choices: ["smooth", "second cut", "half-round", "bastard"],
    answer: "half-round",
  },
  {
    question: "The tool used for cleaning files is called a:",
    choices: ["file cleaner", "file card", "file oilstone", "scraper"],
    answer: "file card",
  },
  {
    question: "Which of the following is the smallest size drill?",
    choices: ["# 80", "# 60", "# 1", "# 0"],
    answer: "# 80",
  },
  {
    question: "Which of the following is the largest size drill?",
    choices: ["A", "X", "Z", "XX"],
    answer: "Z",
  },
  {
    question: "The size of drill is stamped on the:",
    choices: ["point", "shank", "margin", "flute"],
    answer: "shank",
  },
  {
    question:
      "Which of the following safety precautions should be followed when pouring Babbitt?",
    choices: [
      "operator must wear goggles",
      "the surface to be babbitted must be free of moisture",
      "the surface to be babbitted must be clean",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "Which of the following safety precaution should be followed when renewing a flange gasket?",
    choices: [
      "drain the line thoroughly",
      "isolate the section to be worked on",
      "tie down isolation valves",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "Brazing requires:",
    choices: ["hard solder", "soft solder", "more heat", "A and C"],
    answer: "A and C",
  },
  {
    question: "Lead is used in solder because:",
    choices: [
      "it has a high melting point",
      "it has a low melting point",
      "it is cheap",
      "B and C",
    ],
    answer: "B and C",
  },
  {
    question: "The name of the taper shank used on drills is:",
    choices: ["Miller", "Morse", "Starret", "Stanley"],
    answer: "Morse",
  },
  {
    question: "The higher the melting point of the solder, the:",
    choices: [
      "weaker the solder joint",
      "softer the solder joint",
      "stronger the solder joint",
      "harder the solder joint",
    ],
    answer: "stronger the solder joint",
  },
  {
    question: "Which of the following is not part of the headstock?",
    choices: ["Anvil", "Back pressure", "Motor", "Spindle"],
    answer: "Anvil",
  },
  {
    question:
      "A machining operation whereby the tool reciprocates and the feed is stationary.",
    choices: ["Planing", "Reaming", "Shaping", "Turning"],
    answer: "Shaping",
  },
  {
    question:
      "The kind of center, which is being attached and meshed to he tailstock spindle, which is also static while the work, is rotating is know as:",
    choices: ["dead center", "focal center", "live center", "work center"],
    answer: "dead center",
  },
  {
    question:
      "A machine tool in which an abrasive wheel is used as a cutting tool to obtain a very smooth finish.",
    choices: ["Broaching machine", "Milling Machine", "Planer", "Tool Grinder"],
    answer: "Tool Grinder",
  },
  {
    question:
      "A machine too used principally to machine flat or plane surfaces with a single pointed tool.",
    choices: ["Drill", "Planer", "Power Saw", "Shaper"],
    answer: "Shaper",
  },
  {
    question:
      "A tool with hardened steel point used for scribing or laying of distances.",
    choices: ["Divider", "Hermaphrodite", "Plain scriber", "Trammel"],
    answer: "Divider",
  },
  {
    question: "The cylinder of piston type steam engine are counterbored to:",
    choices: [
      "give a larger head clearance",
      "prevent piston rings from wearing a groove in the cylinder at the end of the stroke",
      "give a larger volumetric clearance",
      "prevent piston rings from slipping on the piston",
    ],
    answer:
      "prevent piston rings from wearing a groove in the cylinder at the end of the stroke",
  },
  {
    question: "When installing packing in a packing box:",
    choices: [
      "leave one old turn at the bottom of the packing box",
      "remove one turn and install one new turn of packing",
      "leave sufficient end clearance on each turn to allow for expansion",
      "place and cuts directly in line with each other",
    ],
    answer:
      "leave sufficient end clearance on each turn to allow for expansion",
  },
  {
    question:
      "An instrument consisting of a wet – and dry – bulb thermometer (used in air conditioning) is called a:",
    choices: ["hygrometer", "pyrometer", "psychrometer", "A or C"],
    answer: "A or C",
  },
  {
    question: "Sheet metal of # 18 gage is heavier than:",
    choices: ["12 gage", "14 gage", "22 gage", "16 gage"],
    answer: "22 gage",
  },
  {
    question: "Shims are used to:",
    choices: [
      "separate fresh – and salt – water lines",
      "replace fuses",
      "adjust cylinder liners",
      "adjust bearing clearances",
    ],
    answer: "adjust bearing clearances",
  },
  {
    question: "Quick return motion is used in a",
    choices: ["drilling machine", "grinder", "lathe", "shaper"],
    answer: "shaper",
  },
  {
    question: "The operation of enlarging a hole is called",
    choices: ["boring", "counter sinking", "drilling", "reaming"],
    answer: "boring",
  },
  {
    question: "In up cut milling the work piece is fed",
    choices: [
      "against the rotating cutter",
      "at an angle of 60* to the cutter",
      "at right angle to the cutter",
      "in the direction of the cutter",
    ],
    answer: "against the rotating cutter",
  },
  {
    question: "Rapping allowance is provided on a pattern to take care of",
    choices: ["distortion", "easy withdrawal", "machining", "shrinkage"],
    answer: "easy withdrawal",
  },
  {
    question: "Feeler gage are used for measuring the",
    choices: [
      "clearance between mating parts",
      "pitch of screw threads",
      "radius of curvature",
      "thickness of plates",
    ],
    answer: "clearance between mating parts",
  },
];

export type Questions = (typeof questions)[0];

export default function M4() {
  
    return (
      <main className="h-full w-full grid-cols-1 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto">
        {questions.map((question) => {
          return <Question question={question} key={question.question} />;
        })}
      </main>
    );
}
