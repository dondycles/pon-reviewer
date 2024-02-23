"use client";
import Question from "@/components/question";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useScore } from "@/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const questionsData = [
  {
    question: "A correct cutting angle of a drill for ordinary work is:",
    choices: ["45⁰", "59⁰", "64⁰", "70⁰"],
    answer: "59⁰",
  },
  {
    question: "When using a drill press, the work should be held with:",
    choices: ["A glove hand", "The hand", "A vise and a clamp", "Pliers"],
    answer: "A vise and a clamp",
  },
  {
    question:
      "A machining operation whereby the tool reciprocates and the feed is stationary.",
    choices: ["Reaming", "Shaping", "Plating", "Turning"],
    answer: "Shaping",
  },
  {
    question:
      "A machining operation whereby the tool rotates and the feed is stationary.",
    choices: ["Shaping", "Milling", "Turning", "Reaming"],
    answer: "Milling",
  },
  {
    question:
      "A machine used in shaping metal by means of abrasive wheel or removal of metals with abrasive.",
    choices: ["Shaper", "Plater", "Grinder", "Power saw"],
    answer: "Grinder",
  },
  {
    question: "To prevent leakage in dynamic seals, it is recommended to use:",
    choices: ["Gaskets", "Seals", "Packings", "Felts"],
    answer: "Packings",
  },
  {
    question:
      "The process of checking or producing checkers on the surface of the piece by rolling checkered depressions on the surface.",
    choices: ["Indexing", "Soldering", "Knurling", "Quenching"],
    answer: "Knurling",
  },
  {
    question: "Tooth width measured along the chord at the pitch circle.",
    choices: [
      "Chord space",
      "Chordal thickness",
      "Chord clearance",
      "Chord length",
    ],
    answer: "Chordal thickness",
  },
  {
    question:
      "It is recommended for high-speed application that the maximum number of teeth in a small sprocket should be:",
    choices: ["10 to 20", "16 to 32", "14 to 28", "18 to 24"],
    answer: "18 to 24",
  },
  {
    question:
      "Cast iron flywheels are commonly designated with a factor of safety of:",
    choices: ["8 to 10", "10 to 13", "5 to 6", "18 to 20"],
    answer: "10 to 13",
  },
  {
    question:
      "Agency handling assistance to all foundry, machine shop, and metallurgical plant operators.",
    choices: ["DOST", "BOI", "MIRDC", "UNICEF"],
    answer: "MIRDC",
  },
  {
    question:
      "A metal characteristic that absorbs extreme deformation without rupture is called:",
    choices: ["Hardness", "Ductility", "Plasticity", "Toughness"],
    answer: "Plasticity",
  },
  {
    question:
      "The size of all the pipes from 1/16 inches to 12 inches is defined by _____ size.",
    choices: ["Design", "External diameter", "Inside diameter", "Tubular"],
    answer: "Inside diameter",
  },
  {
    question:
      "Cutting lubricants used in drilling, reaming, and lapping of cast iron parts.",
    choices: ["Soda water", "Kerosene", "Soluble oil", "Dry"],
    answer: "Dry",
  },
  {
    question:
      "The angle developed between tooth profile and radial line at its pitch point is referred to as:",
    choices: [
      "Approach angle",
      "Pressure angle",
      "Recess angle",
      "Base helix angle",
    ],
    answer: "Pressure angle",
  },
  {
    question: "The purpose of annealing is to make a metal:",
    choices: ["Harder", "Medium hard", "Softer", "Brittle"],
    answer: "Softer",
  },
  {
    question: "AISI numbering for silicot steel.",
    choices: ["85XX", "92XX", "93XX", "87XX"],
    answer: "92XX",
  },
  {
    question: "Specific weight of steel in lbs/inches³",
    choices: ["0.832", "0.328", "0.283", "0.823"],
    answer: "0.283",
  },
  {
    question: "Ratio of coil to wire diameter, a measure of coil curvature.",
    choices: ["Spring rate", "Spring index", "Wahl’s factor", "Spring scale"],
    answer: "Spring index",
  },
  {
    question:
      "When a hole is smaller than the shaft, it will take pressure to pull the parts together, and the allowance is relative and is termed as:",
    choices: [
      "Relative fits",
      "Relative allowance",
      "Interference of metals",
      "Relative clearance",
    ],
    answer: "Interference of metals",
  },
  {
    question: "A kind of thread that is widely used.",
    choices: ["UNF", "UNEF", "UNC", "8-Thread series"],
    answer: "UNC",
  },
  {
    question:
      "A machine tool used principally to machine flat or plate surfaces with a single point cutting tool.",
    choices: ["Shaper", "Plater", "Milling", "Lathe"],
    answer: "Shaper",
  },
  {
    question:
      "The ratio of relative viscosities colliding bodies after impact to their velocity before impact.",
    choices: [
      "Coefficient of friction",
      "Coefficient of velocity",
      "Coefficient of restitution",
      "Coefficient of fluctuation",
    ],
    answer: "Coefficient of restitution",
  },
  {
    question:
      "In machine shop forging operation of lengthening a piece of stock while reducing the cross-sectional area of work is called:",
    choices: ["Reducing", "Upsetting", "Upgrading", "Desizing"],
    answer: "Upsetting",
  },
  {
    question:
      "It is the radial distance between the top of the tooth and the bottoms of the mating tooth space.",
    choices: ["Clearance", "Tolerance", "Lead", "Crest"],
    answer: "Clearance",
  },
  {
    question:
      "An arc of the pitch circle through which a tooth travels from its contact to a mating tooth at the pitch point to the point where contact ceases.",
    choices: ["Arc of action", "Arc of recess", "Arc of approach", "Backlash"],
    answer: "Arc of approach",
  },
  {
    question:
      "The distance a helical gear would thread along its axis in one revolution if it were free to move axially.",
    choices: ["Crest", "Lead", "Module", "Clearance"],
    answer: "Lead",
  },
  {
    question:
      "Ability of a material to absorb energy when deformed elastically and return to it when unloaded is:",
    choices: ["Toughness", "Creep", "Resilience", "Plasticity"],
    answer: "Resilience",
  },
  {
    question:
      "A weld made to hold the parts of a weldment in proper alignment until final welds are made.",
    choices: [
      "Fusion weld",
      "Tack weld",
      "Electric weld",
      "Oxy-acetylene weld",
    ],
    answer: "Tack weld",
  },
  {
    question:
      "It is a machine used for testing of very thin steel or surface layers.",
    choices: ["Charpy test", "Izod test", "Descriptor test", "Rockwell test"],
    answer: "Rockwell test",
  },
  {
    question:
      "A machine tool in which an abrasive wheel is used as a cutting tool to obtain a very smooth finish.",
    choices: ["Broaching machine", "Plater", "Tool grinder", "Lathe machine"],
    answer: "Tool grinder",
  },
  {
    question:
      "A machine tool used to produce a variety of surfaces by using a circular type cutter with multiple teeth.",
    choices: [
      "Lathe machine",
      "Milling machine",
      "Broaching machine",
      "Grinding machine",
    ],
    answer: "Milling machine",
  },
  {
    question:
      "A cutting tool used to finish internal and external surfaces by the use of a cutter called a broach, which has a series of cutting edges or teeth.",
    choices: ["Lathe machine", "Broaching machine", "Plater", "Shaper"],
    answer: "Broaching machine",
  },
  {
    question:
      "A kind of chuck, which should not be used where accuracy is required called",
    choices: [
      "Collet chuck",
      "Magnetic chuck",
      "Four-jaw chuck",
      "Universal chuck",
    ],
    answer: "Four-jaw chuck",
  },
  {
    question:
      "A tool when pressed into a finished hole in a piece of work, provides a better fit to which the piece may be turned or otherwise machined called",
    choices: ["Mesh", "Butt", "Mandrel", "Wobble"],
    answer: "Mandrel",
  },
  {
    question:
      "A machine tool which is very similar to a shaper except that the ram reciprocates vertically rather than horizontally.",
    choices: ["Lathe", "Grinder", "Plater", "Slotter"],
    answer: "Slotter",
  },
  {
    question:
      "A cylindrical bar of steel with threads formed around it and grooves or flutes running lengthwise in it, intersecting with threads to form cutting edges. It is used to cut internal threads.",
    choices: ["Groove", "Lap", "Tap", "Flute"],
    answer: "Tap",
  },
  {
    question:
      "The operator of making a countersunk enlargement of the end of a hole, as for a recess for a flat head screw.",
    choices: ["Countersinking", "Knurling", "Squaring", "Performing"],
    answer: "Countersinking",
  },

  {
    question:
      "It is an operator of sizing and finishing a hole by means of a cutting tool having several cutting edges.",
    choices: ["Notching", "Piercing", "Turning", "Reaming"],
    answer: "Reaming",
  },
  {
    question:
      "The shop term used to include the marking or inscribing of center points, circle area of straight lines upon metal surface either curve or flat, for the guidance of the worker called:",
    choices: ["Shaping", "Hobbing", "Laying out", "Shaping"],
    answer: "Laying out",
  },
  {
    question:
      "It is used to true and align machine tools, fixtures, and works to test and inspect size trueness of finished work and compare measurements either heights or depths or many other measurements.",
    choices: ["Dial gauge", "Dial indicator", "Tachometer", "Speedometer"],
    answer: "Dial indicator",
  },
  {
    question:
      "The process of forming metals by the use of dies after the metal is heated to its plastic state.",
    choices: ["Rolling", "Forging", "Turning", "Casting"],
    answer: "Rolling",
  },
  {
    question:
      "A machine tool used to cut metals in a light, medium, and large section using a reciprocating hacksaw blade.",
    choices: ["Tool grinder", "Shaper", "Plater", "Power saw"],
    answer: "Power saw",
  },
  {
    question: "The usual value of helix angle of a drill is:",
    choices: ["30⁰", "60⁰", "110⁰", "120⁰"],
    answer: "30⁰",
  },
  {
    question: "Wiping is the process of:",
    choices: [
      "Applying flux during welding process",
      "Cleaning the welded surface after the welding operator is over",
      "Connecting lead pipes by soldering alloy",
      "Low temperature welding",
    ],
    answer: "Connecting lead pipes by soldering alloy",
  },
  {
    question: "In Carthias process",
    choices: [
      "Molten metal is fed into the cavity in metallic mould by gravity",
      "Metal is poured into die cavity and after a predetermined time the mould is inverted to permit a part of main steel in molten state to flow out of cavity",
      "Cavity is filled with a precalculated quantity of metal and a core or plunger is inserted to force the metal into cavity",
      "Metal is forced into mould under high pressure",
    ],
    answer:
      "Cavity is filled with a precalculated quantity of metal and a core or plunger is inserted to force the metal into cavity",
  },
  {
    question: "What is the purpose of riser?",
    choices: [
      "Feed the casting at a rate consistent with the rate of solidification",
      "Act as a reservoir for molten metal",
      "Help feed the casting until solidification takes place",
      "Feed molten metal from pouring basin to gates",
    ],
    answer: "Help feed the casting until solidification takes place",
  },
  {
    question: "The mould for casting ferrous materials",
    choices: [
      "Copper",
      "High carbon steel",
      "Low carbon steel",
      "Medium carbon steel",
    ],
    answer: "Copper",
  },
  {
    question: "A plug gauge is used to measure",
    choices: [
      "Cylindrical bores",
      "Screw threads",
      "Spherical holes",
      "Taper bores",
    ],
    answer: "Cylindrical bores",
  },
  {
    question:
      "When a large number of components are turned and parted off a bar the chuck usually used is the _____.",
    choices: [
      "Collet chuck",
      "Four jaw chuck",
      "Magnetic chuck",
      "Two jaw chuck",
    ],
    answer: "Magnetic chuck",
  },
  {
    question: "Which of the following is the cutting speed m of brass?",
    choices: ["30m/min", "40m/min", "50m/min", "60m/min"],
    answer: "40m/min",
  },
  {
    question: "Quick return mechanism is used in a",
    choices: ["Drilling machine", "Grinder", "Lathe", "Shaper"],
    answer: "Shaper",
  },
  {
    question: "Mandrel used to hold",
    choices: ["Cutting tool", "Drill bits", "Face plate", "Hollow work pieces"],
    answer: "Hollow work pieces",
  },
  {
    question: "In up-cut milling, the work piece is fed",
    choices: [
      "Against the milling cutter",
      "At an angle of 60⁰ at the center",
      "At the right angle of the cutter",
      "In the direction of the cutter",
    ],
    answer: "Against the milling cutter",
  },
  {
    question: "Sprue is passage provided for the",
    choices: [
      "Out flow",
      "In flow",
      "Smooth flow",
      "Solidification of molten material",
    ],
    answer: "In flow",
  },
  {
    question: "Feed in the lathe machine is expressed in",
    choices: ["mm", "mm per degree", "mm per revolution", "rpm"],
    answer: "mm per revolution",
  },
  {
    question: "Rapping allowance is provided on a pattern to take care of",
    choices: ["Shrinkage", "Machining", "Distortion", "Easy withdrawal"],
    answer: "Easy withdrawal",
  },
  {
    question: "Chuck used in turret lathe is",
    choices: [
      "Collet chuck",
      "Four jaw self centering chuck",
      "Magnetic chuck",
      "Three jaw chuck",
    ],
    answer: "Three jaw chuck",
  },
  {
    question: "Cape in foundry practice refers to",
    choices: [
      "Bottom half of molding box",
      "Coating on the mold face",
      "Middle portion of the mold",
      "Top half molding box",
    ],
    answer: "Top half molding box",
  },
  {
    question: "A vent wire is used in",
    choices: ["Foundry", "Hot forging", "Cold forging", "Fitting"],
    answer: "Hot forging",
  },
  {
    question: "A file plate is used for",
    choices: [
      "Cutting tapers in a lathe",
      "Cutting gears in a shaper",
      "Cutting gears in a milling machine",
      "Fixing job on a tile in a grinder",
    ],
    answer: "Cutting gears in a shaper",
  },
  {
    question: "Permeability, in relation to molding sands, is high for",
    choices: ["Coarse grains", "Fine grains", "Medium grains", "Round grains"],
    answer: "Coarse grains",
  },
  {
    question: "The purpose of tumbler gears in lathe is to",
    choices: [
      "Cut gears",
      "Cut threads",
      "Give desired direction of the movement to the lathe carriage",
      "Reduce spindle speed",
    ],
    answer: "Give desired direction of the movement to the lathe carriage",
  },
  {
    question: "A size bar cannot be used without a/at",
    choices: ["File plate", "Micrometer", "Slip gauge", "Vernier caliper"],
    answer: "File plate",
  },
  {
    question:
      "The operator of finishing drilled hole to the correct size is known as",
    choices: ["Counter boring", "Counter sinking", "Reaming", "Spot facing"],
    answer: "Reaming",
  },
  {
    question:
      "When the outer corners of the cutting edges of a drill wear away too rapidly, it is an indicator of?",
    choices: [
      "Too low speed",
      "Too much rake angle",
      "Too much high speed",
      "B or C",
    ],
    answer: "B or C",
  },
  {
    question: "Carbon steel should be operated at",
    choices: [
      "Speed greater than that when using a high-speed drill",
      "Speed less than that when using a high-speed drill",
      "The same speed as that using a high-speed steel",
      "None of the above",
    ],
    answer: "Speed less than that when using a high-speed drill",
  },
  {
    question: "Knurling is done to_____",
    choices: ["Boring", "Chamfering", "Plating", "Turning"],
    answer: "Chamfering",
  },
  {
    question:
      "When material in a lathe, the harder the material being cut, the tool bit should have",
    choices: [
      "Less side rake",
      "More side rake",
      "More top rake",
      "No side rake",
    ],
    answer: "Less side rake",
  },
  {
    question: "After grinding the tool bit, the cutting edge should be",
    choices: [
      "Case hardened",
      "Rubbed with emery cloth",
      "Rubbed with crocus cloth",
      "Stoned with oil stone",
    ],
    answer: "Stoned with oil stone",
  },
  {
    question:
      "When cutting material in a lathe, the softer the material being cut, the tool bit should have",
    choices: [
      "Any of these",
      "Double top rake",
      "Less top rake",
      "More top rake",
    ],
    answer: "Less top rake",
  },
  {
    question: "A piece of cast iron held against an emery wheel will give off",
    choices: [
      "Bright shiny sparks",
      "Dull yellow sparks",
      "Red sparks",
      "No sparks",
    ],
    answer: "Dull yellow sparks",
  },
  {
    question: "The alignment of coupling faces can be checked by",
    choices: [
      "Inserting a feeler gauge between coupling faces at various points around the circumference",
      "Inserting thermometer",
      "Rotating and measuring to nearest permanent fit",
      "Using an outside micrometer",
    ],
    answer:
      "Inserting a feeler gauge between coupling faces at various points around the circumference",
  },
  {
    question: "A drill bit has",
    choices: ["1 flute", "2 flutes", "3 flutes", "4 flutes"],
    answer: "2 flutes",
  },
  {
    question: "When using a drill press, the work should be held with",
    choices: ["A pair of pulley", "A vise or clamp", "Gloves on", "The hand"],
    answer: "A vise or clamp",
  },
  {
    question: "When a lathe is put into back gear, it will go",
    choices: [
      "At a slower speed backwards",
      "At the same speed backward",
      "Faster",
      "Slower",
    ],
    answer: "Slower",
  },

  {
    question: "On a lathe, the dead center is used after",
    choices: ["Boring", "Center-drilling", "Drilling", "Reaming"],
    answer: "Center-drilling",
  },
  {
    question:
      "The best file to use when finishing a sharp corner or a lot of grooves is the",
    choices: ["Jewelry file", "Knife file", "Mill file", "Square file"],
    answer: "Knife file",
  },
  {
    question: "Never use a file",
    choices: [
      "That is dirty",
      "With a tang",
      "Without a handle",
      "Without oiling",
    ],
    answer: "With a tang",
  },
  {
    question:
      "Which of the following information is necessary when ordering a file",
    choices: ["Size", "Shape", "Type of teeth", "All the above"],
    answer: "All the above",
  },
  {
    question:
      "When filing a piece of metal on a lathe if short quick strokes are used the finished piece will probably",
    choices: [
      "Be out of round",
      "Be perfect",
      "Have small flat areas on the surfaces",
      "A and C",
    ],
    answer: "A and C",
  },
  {
    question:
      "The best procedure when filing a piece of metal on a lathe is to take",
    choices: [
      "Long fast strokes",
      "Long slow strokes",
      "Short even strokes",
      "Short fast strokes",
    ],
    answer: "Long slow strokes",
  },
  {
    question:
      "Small pieces of metal clogged between the teeth of a file are called",
    choices: ["Bumps", "Clogs", "Flats", "Pits"],
    answer: "Pits",
  },
  {
    question:
      "Finishing of a piece of metal with a real smooth finish can be done by",
    choices: ["Draw-filing", "Flat-filing", "Mill-filing", "Slide-filing"],
    answer: "Draw-filing",
  },
  {
    question: "For finishing a piece of work to size the file to use is the",
    choices: [
      "Crosscut file",
      "Double-cut file-tooth file",
      "Mill file",
      "Single-cut file-tooth file",
    ],
    answer: "Single-cut file-tooth file",
  },
  {
    question: "For filing lead or babbit, use a",
    choices: ["Lead float file", "Mill file", "Vixen file", "A and C"],
    answer: "A and C",
  },
  {
    question: "A hacksaw blade with 32 TPI is best suited for cutting",
    choices: [
      "Small tubing",
      "Conduit",
      "Sheet metal under 18 gauge",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "A coolant is used when cutting a material in a power hacksaw to",
    choices: [
      "Absorb heat of friction",
      "Prevent the blade from overheating",
      "Prevent the blade from losing temper",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "A hacksaw blade with 10 teeth per inch is best suited for cutting",
    choices: ["Aluminum", "Cast iron", "Solid iron", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "When cutting a long thin piece of metal",
    choices: [
      "Set the blade in the frame with the teeth facing toward you",
      "Turn the blade at right angles to the frame",
      "Turn the blade upside down in the frame",
      "Use a blade with fewer teeth per inch",
    ],
    answer: "Turn the blade at right angles to the frame",
  },
  {
    question: "The hacksaw blade should be placed in the frame with",
    choices: [
      "One end looser than the other end",
      "The teeth facing in any direction",
      "The teeth pointing backward",
      "The teeth facing forward",
    ],
    answer: "The teeth facing forward",
  },
  {
    question:
      "A hacksaw blade with 34 teeth per inch should be used for cutting",
    choices: ["Brass", "Cast iron", "Heavy", "Thin wall tubing"],
    answer: "Thin wall tubing",
  },
  {
    question: "A hard hacksaw blade is best suited for work on",
    choices: ["Brass", "Cast iron", "Tool steel", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "A hacksaw blade with 14 TPI is best suited for cutting",
    choices: [
      "Cold rolled steel",
      "Hot rolled steel",
      "Structural steel",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "Files are divided into two general classes, namely",
    choices: [
      "Flat shapes and round shapes",
      "Large and small",
      "Rough and smooth",
      "Single-cut and double-cut",
    ],
    answer: "Single-cut and double-cut",
  },
  {
    question: "A hacksaw blade can be placed in a frame in",
    choices: [
      "One position",
      "Two positions",
      "Three positions",
      "Four positions",
    ],
    answer: "Four positions",
  },
  {
    question: "A hard hacksaw blade is one that",
    choices: [
      "Has a hard back and flexible teeth",
      "Has a flexible back and hard teeth",
      "Has the entire blade hardened",
      "Will only fit a solid frame hacksaw",
    ],
    answer: "Has the entire blade hardened",
  },

  {
    question: "Hacksaw blade with 24 TPI is best suited for cutting",
    choices: [
      "Brass and copper",
      "Sheet metal over 18 gauge",
      "Tubing",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "Hacksaw blades are made of",
    choices: [
      "High speed",
      "Tool steel",
      "Tungsten alloy steel",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "A flexible hacksaw blade is one that has",
    choices: [
      "A movable blade",
      "Flexible ends",
      "Only the back hardened",
      "Only the teeth hardened",
    ],
    answer: "Only the teeth hardened",
  },
  {
    question: "When lathe tool bit burns, it means that the",
    choices: [
      "Speed is too low",
      "Speed is too fast",
      "Material is too hard",
      "Material cannot be done",
    ],
    answer: "Speed is too fast",
  },
  {
    question: "The lathe compound is used for",
    choices: ["Angle cutting", "Grooving", "Facing", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "A universal chuck cannot be used to cut",
    choices: ["An eccentric", "A round stock", "A cam", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "The jaw of a standard vise is",
    choices: ["Hard", "Semi-hard", "Semi-soft", "Soft"],
    answer: "Hard",
  },
  {
    question:
      "When facing off a piece of material in the lathe chuck the bit must be set",
    choices: [
      "Above center",
      "At the center",
      "Below the center",
      "Off center",
    ],
    answer: "At the center",
  },
  {
    question: "The out break of fire can be avoided by preventing:",
    choices: ["Fuel", "Heat", "Oxygen", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question:
      "The square head of a combination set is used for marking or checking the angles:",
    choices: [
      "90⁰ only",
      "45⁰ only",
      "90⁰ and 45⁰",
      "Any angle between 0-180⁰",
    ],
    answer: "90⁰ and 45⁰",
  },
  {
    question: "Angle plate is made of:",
    choices: [
      "Closed grain cast iron",
      "Cast steel",
      "Tool steel",
      "High speed steel",
    ],
    answer: "Closed grain cast iron",
  },
  {
    question:
      "The eye hole of a hammer head is made in oval shape and taper towards center because:",
    choices: [
      "It is easy for production",
      "It is specially designed by experts",
      "It accommodates the handle and a wedge for preventing it from flying off",
      "Any of the above",
    ],
    answer:
      "It accommodates the handle and a wedge for preventing it from flying off",
  },
  {
    question: "The jaws of a leg vise are operated:",
    choices: [
      "Parallel to each other",
      "In 'V' form",
      "Both A and B",
      "Neither A nor B",
    ],
    answer: "In 'V' form",
  },
  {
    question:
      "For internal work the cutting angle of a cold flat chisel is ground at an angle of:",
    choices: ["80⁰", "70⁰", "60⁰", "35⁰"],
    answer: "60⁰",
  },
  {
    question: "A new hacksaw blade should not be used in old cut because:",
    choices: [
      "The blade is very costly",
      "The blade have very sharp teeth",
      "The space is not sufficient to play the new blade in the old cut",
      "Any of the above",
    ],
    answer: "The space is not sufficient to play the new blade in the old cut",
  },
  {
    question: "Which of the following file is not hardened:",
    choices: ["Tang", "Heel", "Body", "Point"],
    answer: "Tang",
  },
  {
    question: "In case of a flat scraper, the depth of the cut is verified by:",
    choices: [
      "Changing the convexity of the cutting edge",
      "Changing its inclination",
      "Changing its weight",
      "Any of the above",
    ],
    answer: "Changing its inclination",
  },
  {
    question: "Generally, spiral fluted reamer has spirals of:",
    choices: ["Left hand", "Right hand", "Straight", "Any of the above"],
    answer: "Left hand",
  },
  {
    question:
      "In which screw thread the side = width of flat = width space = 0.5p",
    choices: ["Knuckle", "Buttress", "Square", "Acme"],
    answer: "Square",
  },
  {
    question: "A stud is which:",
    choices: [
      "Have threads on one end",
      "Require a nut",
      "Inserted in a plate hole",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "'18 – 8' stainless steel means:",
    choices: [
      "18% Tungsten and 8% Chromium",
      "18% Chromium and 8% Nickel",
      "18% Nickel and 8% Chromium",
      "18% Chromium and 8% Cobalt",
    ],
    answer: "18% Chromium and 8% Nickel",
  },
  {
    question: "Which is the lightest metal:",
    choices: ["Lead", "G.I. Sheet", "Aluminum", "Cast iron"],
    answer: "Aluminum",
  },
  {
    question: "Hardened steel parts have:",
    choices: [
      "Fine grains",
      "Coarse grains",
      "Medium grains",
      "Any of the above",
    ],
    answer: "Fine grains",
  },
  {
    question: "Concentricity of an outside diameter can be checked by:",
    choices: [
      "Vernier caliper",
      "Outside micrometer",
      "Dial test indicator",
      "Tube micrometer",
    ],
    answer: "Dial test indicator",
  },
  {
    question: "Which micrometer has an anvil:",
    choices: [
      "Outside micrometer",
      "Depth micrometer",
      "Screw thread micrometer",
      "Diameter micrometer",
    ],
    answer: "Depth micrometer",
  },
  {
    question: "Which micrometer is available with extension rods:",
    choices: [
      "Outside micrometer",
      "Inside micrometer",
      "Screw thread micrometer",
      "Combi micrometer",
    ],
    answer: "Inside micrometer",
  },
  {
    question: "Which gauge is used to check the internal threads:",
    choices: [
      "Plug gauge",
      "Ring gauge",
      "Thread plug gauge",
      "Thread ring gauge",
    ],
    answer: "Thread plug gauge",
  },
  {
    question:
      "In case of a limit plug gauge, which size will not enter into the hole:",
    choices: ["'Go' size", "'Not Go' size", "Both A and B", "Neither A nor B"],
    answer: "'Not Go' size",
  },
  {
    question:
      "Limit gauge is made to the _____ sizes of the work to be measured:",
    choices: [
      "Actual and nominal",
      "Nominal and upper limit",
      "Nominal and lower limit",
      "Minimum and maximum",
    ],
    answer: "Minimum and maximum",
  },
  {
    question: "'Go' limit is:",
    choices: [
      "Upper limit of shaft",
      "Lower limit of shaft",
      "Both A and B",
      "Neither A nor B",
    ],
    answer: "Both A and B",
  },
  {
    question: "Lapping is done:",
    choices: [
      "To finish the job to a fine degree of accuracy",
      "To get high quality of surface finish",
      "To control the size",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "In which method a bore is finished to a very close tolerance:",
    choices: ["Lapping", "Honing", "Grinding", "Turning"],
    answer: "Honing",
  },
  {
    question: "Jig bushings are internally made of:",
    choices: ["Mild steel", "Cast iron", "Tool steel", "Brass"],
    answer: "Tool steel",
  },
  {
    question: "Fixture clamps are internally made of:",
    choices: [
      "High carbon steel",
      "Case hardened mild steel",
      "High speed steel",
      "Alloy steel",
    ],
    answer: "Case hardened mild steel",
  },
  {
    question: "Successful designing of jigs and fixtures depend upon:",
    choices: [
      "Clamping arrangement",
      "Tool guiding elements",
      "Manufacturing conditions",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "When an external gear is meshed with an internal gear, the gears will rotate in:",
    choices: [
      "Same direction",
      "Opposite direction",
      "Will not rotate",
      "Neither A nor B",
    ],
    answer: "Same direction",
  },
  {
    question: "While soldering, the flux is used because:",
    choices: [
      "It assists for quick melting and increases the fluidity of solder",
      "It saves the part from oxidation",
      "It takes the molten metal on all surfaces",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "A usual ratio of soluble oil and water used in coolant is:",
    choices: ["1 : 10", "10 : 1", "1 : 20", "20 : 1"],
    answer: "1 : 20",
  },
  {
    question:
      "If rpm = 200, feed per revolution = 0.05mm, then feed per minute will be:",
    choices: ["100mm", "10mm", "4mm", "1mm"],
    answer: "10mm",
  },
  {
    question:
      "For a given rpm, if the diameter of a twist drill increases, then the cutting speed will:",
    choices: ["Increase", "Decrease", "Same", "Neither A nor B"],
    answer: "Increase",
  },
  {
    question:
      "In advance motion allotting, the longitudinal axis of a twist drill is called:",
    choices: ["Speed", "Feed", "Cutting speed", "Any of the above"],
    answer: "Feed",
  },
  {
    question:
      "In internal cylindrical grinding, the grinding wheel and the work rotate in:",
    choices: [
      "Same direction",
      "Opposite direction",
      "Either A and B",
      "Both A and B",
    ],
    answer: "Opposite direction",
  },
  {
    question:
      "For grinding materials having low tensile strength, which abrasive is used:",
    choices: ["Silicon carbide", "Aluminum carbide", "Emery", "Corundum"],
    answer: "Silicon carbide",
  },
  {
    question: "The size of a grinding wheel is taken from:",
    choices: [
      "Diameter of wheel",
      "Bore size",
      "Width of face",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "Which center is used for supporting opposite end of pipes, shells etc. while turning or thread cutting in a lathe:",
    choices: ["Ball center", "Half center", "Pipe center", "Female center"],
    answer: "Pipe center",
  },
  {
    question:
      "When outside diameter of a job is turned in relation to the internal hole, the job should be held:",
    choices: [
      "In three jaw chuck",
      "On lathe mandrel",
      "On face plate",
      "Between centers",
    ],
    answer: "On lathe mandrel",
  },
  {
    question: "The included angle of a dead center is:",
    choices: ["30⁰", "45⁰", "60⁰", "90⁰"],
    answer: "60⁰",
  },
  {
    question: "The angle of B.A. screw thread is:",
    choices: ["60⁰", "55⁰", "45⁰", "47.5⁰"],
    answer: "47.5⁰",
  },
  {
    question: "Main alloying element in H.S.S. is:",
    choices: ["Chromium", "Vanadium", "Tungsten", "Nickel"],
    answer: "Tungsten",
  },
  {
    question: "The value of one micron is:",
    choices: ["1.00 mm", "0.10 mm", "0.01 mm", "0.001 mm"],
    answer: "0.001 mm",
  },
  {
    question: "For the accurate measurement of bores, the best instrument is:",
    choices: [
      "Vernier caliper",
      "Dial test indicator",
      "Plug gauge",
      "Inside micrometer",
    ],
    answer: "Inside micrometer",
  },
  {
    question: "Under sine principle the length of sine bar takes the place of:",
    choices: ["Opposite side", "Adjacent side", "Hypotenuse", "Height"],
    answer: "Hypotenuse",
  },
  {
    question: "In a hydraulic drive shaper, the metal is removed at:",
    choices: [
      "Higher speed",
      "Lower speed",
      "Average speed",
      "Any of the above",
    ],
    answer: "Higher speed",
  },
  {
    question: "In a shaper, the cutting speed (metric) is expressed in:",
    choices: [
      "Meter per minute",
      "Meter per second",
      "Meter per hour",
      "Any of the above",
    ],
    answer: "Meter per minute",
  },
  {
    question:
      "Amount of automatic feed in shaper is increased by taking the crank pin:",
    choices: [
      "At the center of crank disc",
      "Towards the center of crank disc",
      "Away from the center of crank disc",
      "Any of the above",
    ],
    answer: "Away from the center of crank disc",
  },
  {
    question: "In a shaper, the feed (metric) is usually expressed in:",
    choices: [
      "mm / stroke",
      "mm / revolution",
      "Meter / minute",
      "Any of the above",
    ],
    answer: "mm / stroke",
  },
  {
    question: "For cutting gear teeth in a shaper, the _____ tool is used:",
    choices: ["Loose-neck", "'V' shaped", "Round nose", "Form"],
    answer: "Form",
  },
  {
    question: "Shaper tool bit should not extend in tool holder beyond:",
    choices: ["5 mm", "15 mm", "25 mm", "50 mm"],
    answer: "15 mm",
  },
  {
    question: "The standard ratio of cutting to return stroke in shaper is:",
    choices: ["3 : 1", "1 : 3", "2 : 3", "3 : 2"],
    answer: "3 : 2",
  },
  {
    question: "A tipped tool is more useful than H.S.S. tool because:",
    choices: [
      "It can resist more heat",
      "It can keep the cutting point sharp",
      "Cutting speed can be increased",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "The feed in shaper takes place at:",
    choices: [
      "the beginning of return stroke",
      "the beginning of cutting stroke",
      "the middle of return stroke",
      "the end of return stroke",
    ],
    answer: "the end of return stroke",
  },
  {
    question:
      "Which of the following quick return mechanisms is most widely used in most of the slotters:",
    choices: [
      "Whitworth mechanism",
      "Slotter disc mechanism",
      "Hydraulic mechanism",
      "Slotter link and gear mechanism",
    ],
    answer: "Whitworth mechanism",
  },
  {
    question: "In a slotter, the cutting speed depends upon:",
    choices: [
      "materials to be used",
      "materials of the slotter tool",
      "finish required",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "The clamping block to be used in a slotter to support the end of the strap is made of:",
    choices: ["H.S.S.", "high carbon steel", "lead", "wood"],
    answer: "wood",
  },
  {
    question: "Divided table plate has:",
    choices: ["one table", "two tables", "one housing", "two housings"],
    answer: "two tables",
  },
  {
    question: "The straddle milling is done by means of two:",
    choices: [
      "side milling cutters",
      "plain milling cutters",
      "face milling cutters",
      "form cutters",
    ],
    answer: "side milling cutters",
  },
  {
    question:
      "The formula to find out the number of turns of the crank for simple indexing is:",
    choices: ["T = 20 / N", "T = N / 20", "T = 40 / N", "T = N / 40"],
    answer: "T = 40 / N",
  },
  {
    question:
      "In a standard dividing head, 3 holes in 27 hole circles will be:",
    choices: ["6⁰", "4⁰", "2⁰", "1⁰"],
    answer: "1⁰",
  },
  {
    question: "Planner type milling machine is built up for work of:",
    choices: ["light duty", "heavy duty", "medium duty", "all of the above"],
    answer: "heavy duty",
  },
  {
    question:
      "In a straddle milling operation, how many cutters are used to mill the work:",
    choices: ["one", "two", "three or more", "any one of the above"],
    answer: "two",
  },
  {
    question: "For gear cutting, which cutter is used:",
    choices: [
      "end mill cutter",
      "plain milling cutter",
      "form relieve cutter",
      "all of the above",
    ],
    answer: "form relieve cutter",
  },
  {
    question: "The approximate hardness of HSS end mill cutter is:",
    choices: ["45 HRC", "52 HRC", "62 HRC", "72 HRC"],
    answer: "62 HRC",
  },
  {
    question: "The overarm of a milling machine is used to support:",
    choices: ["spindle", "arbor", "column", "table"],
    answer: "arbor",
  },
  {
    question:
      "Which of the following conditions may cause error during knurling:",
    choices: [
      "too much longitudinal feed",
      "clamped length of tool too short",
      "surface speed too low",
      "unnecessary support with tail stock center",
    ],
    answer: "too much longitudinal feed",
  },
  {
    question:
      "Mark the cutter which works simultaneously with up cut and down cut process:",
    choices: [
      "side milling cutter",
      "semi-circular milling cutter",
      "shell end mill",
      "plain milling cutter",
    ],
    answer: "shell end mill",
  },
  {
    question:
      "A polygon with 9 flats is to be milled using the indexing head. The indexing head transmission ratio is 40:1. Determine the number of crank rotations and mark the correct answer:",
    choices: [
      "9 full rotations",
      "5 full rotations, 2 holes on the 36 hole circle",
      "4 full rotations, 12 holes on the 27 hole circle",
      "2 full rotations, 16 holes on the 47 hole circle",
    ],
    answer: "4 full rotations, 12 holes on the 27 hole circle",
  },
  {
    question: "Where the relieved cutters are re-ground:",
    choices: [
      "on the circumferences",
      "relieved cutters are not re-ground",
      "on the flank",
      "on the side faces",
    ],
    answer: "on the flank",
  },
  {
    question:
      "What happens if the job is loosely fitted between centers in cylindrical grinding:",
    choices: [
      "the job will be out of round",
      "the job will be oversized",
      "the job will be thrown out",
      "the job will not rotate",
    ],
    answer: "the job will be out of round",
  },
  {
    question:
      "Which of the following is used to clean the gauge blocks before and after use:",
    choices: [
      "brush",
      "cotton waste",
      "chamois leather or lint cloth",
      "any of the above",
    ],
    answer: "chamois leather or lint cloth",
  },
  {
    question: "One of the causes of grinding wheel glazing is:",
    choices: [
      "grit size is too fine",
      "wheel is hard",
      "wheel speed is too fast",
      "A and B both",
    ],
    answer: "A and B both",
  },
  {
    question: "The grade of grinding wheel depends upon:",
    choices: ["grit size", "structure", "kind of abrasive", "hardness of bond"],
    answer: "hardness of bond",
  },
  {
    question: "Which kind of bond is commonly used:",
    choices: ["vitrified", "rubber", "shellac", "silicon"],
    answer: "vitrified",
  },
  {
    question:
      "A grinding wheel has on the marking 'C', is made with the abrasive:",
    choices: [
      "aluminum oxide",
      "silicon carbide",
      "combination of A and B",
      "corundum",
    ],
    answer: "silicon carbide",
  },
  {
    question: "As per Indian standard, the grit size 46 comes under the group:",
    choices: ["coarse grit", "medium grit", "fine grit", "very fine grit"],
    answer: "medium grit",
  },
  {
    question: "As per Indian standard 'M' grade wheel comes under the group:",
    choices: ["soft", "medium", "hard", "all of the above"],
    answer: "medium",
  },
  {
    question: "The symbol conventionally used for resinoid bond is:",
    choices: ["'V'", "'R'", "'B'", "'E'"],
    answer: "'B'",
  },
  {
    question:
      "A grinding wheel is marked as 51A 46L 5V 23, out of these 5 means:",
    choices: ["kind of abrasive", "kind of bond", "structure", "grit size"],
    answer: "structure",
  },
  {
    question: "Balancing of grinding wheel is done to:",
    choices: [
      "make the outside diameter concentric with the bore",
      "make the sides of wheel parallel",
      "equalize the weight in every portion of the wheel",
      "all of the above",
    ],
    answer: "equalize the weight in every portion of the wheel",
  },
  {
    question: "Grinding fluids are used to:",
    choices: [
      "reduce the friction between the wheel face and the job",
      "prevent loading of wheel",
      "all of the above",
      "none of the above",
    ],
    answer: "all of the above",
  },
  {
    question: "Taps are resharpened by grinding:",
    choices: ["flutes", "threads", "diameter", "relief"],
    answer: "flutes",
  },
  {
    question:
      "In vertical milling machine the spindle is attached ______ to the work table.",
    choices: ["horizontal", "vertical", "angular", "any of the above"],
    answer: "vertical",
  },
  {
    question: "Planner type milling machine is built up for ____ work of:",
    choices: ["light duty", "heavy duty", "medium duty", "any of the above"],
    answer: "heavy duty",
  },
  {
    question:
      "In a straddle milling operation, how many cutters are used to mill the work:",
    choices: ["one", "two", "three or more", "any of the above"],
    answer: "two",
  },
  {
    question: "For gear cutting, which cutter is used:",
    choices: [
      "end mill cutter",
      "plain milling cutter",
      "form relief cutter",
      "all of the above",
    ],
    answer: "form relief cutter",
  },
  {
    question: "In a slotter the table gets ___ different feeds.",
    choices: ["one", "two", "three", "any of the above"],
    answer: "three",
  },
  {
    question:
      "If the clearance of a cutting edge is 5 degree, the lip (wedge) angle is 75 degree the rake angle will be:",
    choices: ["80 degree", "70 degree", "10 degree", "any of the above"],
    answer: "10 degree",
  },
  {
    question: "The approximate hardness of HSS end mill cutter is:",
    choices: ["45 HRC", "52 HRC", "62 HRC", "any of the above"],
    answer: "62 HRC",
  },
  {
    question: "The overarm of a milling machine is used to support:",
    choices: ["spindle", "arbor", "column", "table"],
    answer: "table",
  },
  {
    question: "Where does the speed motor take place in slotting machine?",
    choices: [
      "during the cutting motor",
      "after each forward stroke",
      "at the end of return motor",
      "after each double stroke",
    ],
    answer: "after each double stroke",
  },
  {
    question:
      "Which of the following conditions may cause error during knurling?",
    choices: [
      "too much longitudinal feed",
      "clamped length of tool too short",
      "surface speed too low",
      "unnecessary support with tool stock center",
    ],
    answer: "too much longitudinal feed",
  },
  {
    question:
      "Mark the milling method during which the formation of chatter marks is very likely.",
    choices: [
      "during down cut milling with a straight tooth cutter",
      "during up cut milling with a straight tooth cutter",
      "during face milling with a straight tooth cutter",
      "while using a spiral tooth cutter",
    ],
    answer: "during up cut milling with a straight tooth cutter",
  },
  {
    question:
      "Mark the cutter which works simultaneously with the up cut and down cut process:",
    choices: [
      "side milling cutter",
      "semi-circular milling cutter",
      "shell end mill",
      "plain milling cutter",
    ],
    answer: "shell end mill",
  },
  {
    question: "Where the relieved cutters are reground?",
    choices: [
      "on the circumference",
      "relieved cutters are not reground",
      "on the flank",
      "on the side faces",
    ],
    answer: "on the flank",
  },
  {
    question:
      "What happens if the job is loosely fitted between centers in cylindrical grinding?",
    choices: [
      "the job will be out of round",
      "the job will be oversized",
      "the job will be thrown out",
      "the job will not rotate",
    ],
    answer: "the job will be out of round",
  },
  {
    question:
      "The internal and external taper of cylindrical jobs are ground in:",
    choices: [
      "plain cylindrical grinding machine",
      "universal cylindrical grinding machine",
      "internal grinding machine",
      "centerless grinding machine",
    ],
    answer: "universal cylindrical grinding machine",
  },
  {
    question:
      "Which of the following is used in cleaning the gauge blocks before and after use?",
    choices: [
      "grit size is too fine",
      "wheel is hard",
      "wheel speed is too fast",
      "A and B both",
    ],
    answer: "A and B both",
  },
  {
    question: "The grade of grinding wheel depends upon:",
    choices: ["grit size", "structure", "kind of abrasive", "hardness of bond"],
    answer: "hardness of bond",
  },
  {
    question: "Which kind of bond is commonly used?",
    choices: ["vitrified", "rubber", "shellac", "silicone"],
    answer: "vitrified",
  },
  {
    question: "Which bond is suitable in wet grinding?",
    choices: ["rubber", "silicate", "shellac", "any of the above"],
    answer: "silicate",
  },
  {
    question:
      "A grinding wheel which has on the marking 'C' is made with the abrasive?",
    choices: [
      "aluminum oxide",
      "silicon carbide",
      "combination of A and B",
      "corundum",
    ],
    answer: "silicon carbide",
  },
  {
    question: "As per Indian standard, the grit size 46 comes under the group:",
    choices: ["coarse grit", "medium grit", "fine grit", "very fine grit"],
    answer: "medium grit",
  },
  {
    question: "As per Indian standard 'M' grade wheel comes under the group:",
    choices: ["soft", "medium", "hard", "any of the above"],
    answer: "medium",
  },
  {
    question: "The symbol resinoid bond is:",
    choices: ["'V'", "'R'", "'B'", "'E'"],
    answer: "'B'",
  },
  {
    question:
      "A grinding wheel is marked as 51A 46L 5V 23, out of these 5 means:",
    choices: ["kind of abrasive", "kind of bond", "structure", "grit size"],
    answer: "structure",
  },
  {
    question: "Balancing of grinding wheel is done to:",
    choices: [
      "make the outside diameter concentric with the bore",
      "make the sides of wheel parallel",
      "equalize the weight in every portion of the wheel",
      "any of the above",
    ],
    answer: "equalize the weight in every portion of the wheel",
  },
  {
    question: "The common measuring tools are:",
    choices: [
      "steel rule",
      "vernier caliper",
      "micrometer",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "It is an operation in stretching or spreading over the metal by means of the plate of the hammer.",
    choices: ["peening", "swaging", "bending", "upsetting"],
    answer: "upsetting",
  },
  {
    question: "The good quality of a measuring tool.",
    choices: [
      "should be easy to handle",
      "should be easy to read",
      "should be wear resistance",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "A tooling device, which is used to hold or grip work piece, while filing, chipping or any other batch work or while machining or drilling them.",
    choices: ["vise", "clamp", "grip", "pressed"],
    answer: "vise",
  },
  {
    question:
      "A multi-pointed handheld cutting tool used to remove material from metallic and non-metallic workpieces to match with drawings, shape and size.",
    choices: ["cold chisel", "file", "hacksaw", "any of the above"],
    answer: "file",
  },
  {
    question:
      "A side cutting tool used for accurately finishing the straight or tapered holes already drilled or bored.",
    choices: ["reamer", "swaging", "peening", "tapping"],
    answer: "reamer",
  },
  {
    question: "A device used to fix two or more parts.",
    choices: ["jigs", "fixtures", "fastener", "clamps"],
    answer: "fastener",
  },
  {
    question: "A machine element inserted parallel to the axis of the shaft.",
    choices: ["fastener", "cutter", "key", "any of the above"],
    answer: "key",
  },
  {
    question:
      "A machine element inserted at the right angle to the axis of the shaft is known as:",
    choices: ["fastener", "cutter", "key", "clamp"],
    answer: "cutter",
  },
  {
    question: "The process of extracting iron in a blast is called:",
    choices: ["sintering", "smelting", "casting", "manufacturing"],
    answer: "smelting",
  },
  {
    question: "Which of the following is a product of a blast furnace?",
    choices: ["wrought iron", "cast iron", "pig iron", "gray iron"],
    answer: "pig iron",
  },
  {
    question:
      "A type of iron which contains 3 to 3.5% carbon either in combined form or in true state.",
    choices: ["wrought iron", "cast iron", "pig iron", "gray iron"],
    answer: "cast iron",
  },
  {
    question:
      "Which of the following furnaces used for manufacture of cast iron?",
    choices: [
      "cupola furnace",
      "crucible furnace",
      "electric furnace",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "A product of puddling furnace, which contains less than 0.10% carbon, is called:",
    choices: ["wrought iron", "cast iron", "pig iron", "gray iron"],
    answer: "wrought iron",
  },
  {
    question: "Which of the following is a property of wrought iron?",
    choices: [
      "ductile",
      "brittle",
      "cannot be forged",
      "can be easily cast into different shapes",
    ],
    answer: "ductile",
  },
  {
    question:
      "Which of the following gives greater hardness, cutting toughness and fine grain structure?",
    choices: ["chromium", "nickel", "titanium", "vanadium"],
    answer: "chromium",
  },
  {
    question:
      "It is the process for making the outer surface harder of the steel part.",
    choices: ["frame hardening", "hardening", "case hardening", "carburizing"],
    answer: "case hardening",
  },
  {
    question:
      "It is a case hardening process by which the carbon content of the steel near the surface of a part is increased.",
    choices: ["nitriding", "tempering", "carburizing", "flame hardening"],
    answer: "carburizing",
  },
  {
    question:
      "It is a case hardening process in which workpiece is heated in a stream of ammonia at 500 to 550°C.",
    choices: ["carburizing", "nitriding", "tempering", "normalizing"],
    answer: "nitriding",
  },
  {
    question:
      "The size by which it is referred to as a matter of convenience called:",
    choices: ["basic size", "actual size", "nominal size", "effective size"],
    answer: "nominal size",
  },
  {
    question:
      "It is a device which holds the job in position and guides the cutting tool.",
    choices: ["clamp", "jig", "vise", "grip"],
    answer: "jig",
  },
  {
    question: "It is a device which holds the job firmly.",
    choices: ["clamp", "grip", "fixture", "jig"],
    answer: "fixture",
  },
  {
    question:
      "It is the outer surface or face of rim of the pulley and made in convex form to keep the belt in center when it is in motion.",
    choices: ["crowning", "dressing", "creep", "slip"],
    answer: "crowning",
  },
  {
    question:
      "It is used to transmit motion at high speed without producing noise.",
    choices: ["bevel gears", "hypoid gears", "helical gears", "worm gears"],
    answer: "helical gears",
  },
  {
    question:
      "It is used to transmit motion at high speed with heavy load without producing noise.",
    choices: ["worm gear", "herringbone gear", "bevel gear", "spur gear"],
    answer: "herringbone gear",
  },
  {
    question:
      "It is used to connect and disconnect the driving and driven units.",
    choices: ["brake", "spring", "clutch", "coupling"],
    answer: "clutch",
  },
  {
    question:
      "It connects the shafts with soft material such as rubber, leather, and canvas.",
    choices: [
      "universal coupling",
      "flexible coupling",
      "rigid coupling",
      "oldham coupling",
    ],
    answer: "flexible coupling",
  },
  {
    question: "What is used to connect the shafts whose axes are intersecting?",
    choices: [
      "rigid coupling",
      "oldham coupling",
      "flexible coupling",
      "universal coupling",
    ],
    answer: "universal coupling",
  },
  {
    question:
      "It is internally used at high speed with light load because it has point contact.",
    choices: [
      "ball bearing",
      "roller bearing",
      "metal bearing",
      "wood bearing",
    ],
    answer: "ball bearing",
  },
  {
    question:
      "It is internally used at high speed with heavy load because it has line contact.",
    choices: [
      "plastic bearing",
      "metal bearing",
      "roller bearing",
      "ball bearing",
    ],
    answer: "roller bearing",
  },
  {
    question:
      "It is a process by which the length of a workpiece is increased by reducing its cross-sectional area.",
    choices: ["drawing out", "drifting", "jumping", "upsetting"],
    answer: "drawing out",
  },
  {
    question: "It is a process by which the length of a workpiece is reduced.",
    choices: ["upsetting", "drawing out", "drifting", "jumping"],
    answer: "upsetting",
  },
  {
    question:
      "It is a set of gears fitted in different positions on a plate, which are controlled by a lever.",
    choices: ["gear train", "stud gear", "tumbler gear", "differential gear"],
    answer: "tumbler gear",
  },
  {
    question:
      "It moves on the lathe bed with cutting tool according to the rotation of lead screw or by the hand traversing wheel.",
    choices: ["apron", "compound rest", "saddle", "mandrel"],
    answer: "saddle",
  },
  {
    question:
      "It acts as the carriage or compound rest through the mechanism lifted inside the ________.",
    choices: ["saddle", "apron", "compound", "mandrel"],
    answer: "apron",
  },
  {
    question:
      "It gives the cutting tool longitudinal feed, cross feed or angular feed.",
    choices: ["compound rest", "apron", "saddle", "carriers"],
    answer: "compound rest",
  },
  {
    question:
      "A holding device used to hold the job properly when turning the outer surface through the finished hole called:",
    choices: ["clamp", "fixture", "jig", "mandrel"],
    answer: "mandrel",
  },
  {
    question: "Which of the following gives shearing action?",
    choices: ["slide rake", "top rake", "side clearance", "front clearance"],
    answer: "top rake",
  },
  {
    question: "What supports top rake?",
    choices: [
      "front clearance",
      "side clearance",
      "side rake",
      "front clearance",
    ],
    answer: "front clearance",
  },
  {
    question: "Which of the following reduces the rubbing action?",
    choices: ["front clearance", "side clearance", "slide rake", "top rake"],
    answer: "front clearance",
  },
  {
    question: "Which of the following is used for all internal purposes?",
    choices: [
      "production process",
      "planer slotter",
      "tool room slotter",
      "all of the above",
    ],
    answer: "planer slotter",
  },
  {
    question:
      "It is an operation of milling the complex surfaces with the help of a group of cutters mounted on the same arbor.",
    choices: [
      "gang milling",
      "straddle milling",
      "climb milling",
      "down milling",
    ],
    answer: "gang milling",
  },
  {
    question:
      "It is an operation of milling two opposite sides of workpiece at a time by using two side milling cutters on the same arbor.",
    choices: [
      "gang milling",
      "straddle milling",
      "side milling",
      "face milling",
    ],
    answer: "straddle milling",
  },
  {
    question:
      "It is an attachment to the milling machine which helps to divide the job periphery into a number of equal divisions.",
    choices: ["index", "dividing head", "slotting", "universal spiral"],
    answer: "dividing head",
  },
  {
    question:
      "It is an operation to divide the periphery of the job into the number of equal parts accurately.",
    choices: ["dividing head", "indexing", "slotting", "all of the above"],
    answer: "indexing",
  },
  {
    question:
      "The angle formed between the face of the tool and work surface or the tangent to the workpiece at the point of contact with the tool called",
    choices: ["clearance angle", "cutting angle", "rake angle", "wedge angle"],
    answer: "rake angle",
  },
  {
    question:
      "The size of the tri square is measured from the inner edge of stock to the end of its ________.",
    choices: ["base", "blade", "edge", "body"],
    answer: "blade",
  },
  {
    question:
      "The best method of avoiding accidents is by observing ______ related to job, machine, and workplace.",
    choices: ["emery", "opponent", "safety precautions", "cleanliness"],
    answer: "safety precautions",
  },
  {
    question: "Mallets are made of ________.",
    choices: ["hardwood", "soft wood", "steel", "cast iron"],
    answer: "hardwood",
  },
  {
    question:
      "Staggering of hacksaw blade teeth on both sides alternately is called",
    choices: [
      "positioning the teeth",
      "arrangement of teeth",
      "setting of teeth",
      "all of the above",
    ],
    answer: "setting of teeth",
  },
  {
    question:
      "The size of a file is measured from ________ to heel of the file.",
    choices: ["Edge", "Base", "Point", "Body"],
    answer: "Point",
  },
  {
    question:
      "It is the distance measured to the axis from a point on a screw thread to the corresponding point of the next thread.",
    choices: ["lead", "pitch", "linear", "chord"],
    answer: "pitch",
  },
  {
    question: "Solder is an alloy of ________.",
    choices: [
      "lead and zinc",
      "lead and tin",
      "lead and tungsten",
      "lead and antimony",
    ],
    answer: "lead and tin",
  },
  {
    question:
      "It is a machine tool used for cutting flat surfaces by reciprocating a single point tool across the workpiece.",
    choices: ["planer", "shearing machine", "shaper", "slab cutter"],
    answer: "shaper",
  },
  {
    question:
      "It is the machine used for shaping of metal or plastic by pushing or pulling a broaching across a surface or through a central hole in a workpiece.",
    choices: ["planing", "shaping", "broaching", "milling"],
    answer: "broaching",
  },
  {
    question:
      "It is a milling method in which parts placed in a row parallel to the axis of the cutting tool end are milled simultaneously.",
    choices: [
      "abreast milling",
      "angular milling",
      "helical milling",
      "all of the above",
    ],
    answer: "abreast milling",
  },
  {
    question:
      "A core drill with hardened steel shot pallets that revolve under the rim of the rotating tube, employed in rotary drilling in very hard ground.",
    choices: [
      "automatic drill",
      "double core barrel drill",
      "fat drill",
      "adamant drill",
    ],
    answer: "adamant drill",
  },
  {
    question:
      "The part of the machine for wood planing that carries the cutter.",
    choices: ["adz stock", "adz block", "head stock", "head block"],
    answer: "adz block",
  },
  {
    question:
      "It is a hole revolving cutter or grinder wheel for mounting it on an arbor.",
    choices: ["hole saw", "arbor hole", "star drill", "pilot hole"],
    answer: "arbor hole",
  },
  {
    question:
      "A machine used for forcing an arbor or a mandrel into drilled or bored parts preparatory to turning or grinding.",
    choices: ["automatic press", "bladder press", "arc press", "arbor press"],
    answer: "arbor press",
  },
  {
    question:
      "A machine in which material pulverized between two toothed metal disks rotating in opposite directions.",
    choices: ["attrition mill", "tumbling mill", "ball mill", "beater mill"],
    answer: "attrition mill",
  },
  {
    question:
      "A press in which mechanical feeding of the work is synchronized with the press action.",
    choices: ["dial press", "punch press", "automatic press", "manual press"],
    answer: "automatic press",
  },
  {
    question: "A file whose edges are parallel is known as",
    choices: ["crochet file", "cross-cut file", "equality file", "butt file"],
    answer: "butt file",
  },
  {
    question:
      "Which of the following is a boring machine tool used particularly for large workpieces, types are horizontal and vertical?",
    choices: ["boring mill", "burrstone mill", "cane mill", "chile mill"],
    answer: "boring mill",
  },
  {
    question: "A tap with a chamfer 1-1 1/2 threads in length",
    choices: ["center tap", "bottom tap", "taper tap", "plug tap"],
    answer: "bottom tap",
  },
  {
    question:
      "A small portable hand drill customarily used by jewelry setters to drill hole in breast called",
    choices: ["diamond drill", "spiral drill", "chum drill", "breast drill"],
    answer: "breast drill",
  },
  {
    question:
      "The spindle of the grinding machine on which the wheel is mounted",
    choices: ["bushing", "arbor", "bearing", "nut"],
    answer: "arbor",
  },
  {
    question:
      "A device for holding grinding wheels of special shape or the workpiece being ground.",
    choices: ["head stock", "fixtures", "jigs", "chucks"],
    answer: "chucks",
  },
  {
    question: "Grinding grooves of a twist drill or tap.",
    choices: ["flute", "fret", "lapping", "honing"],
    answer: "flute",
  },
  {
    question:
      "The dulling of the cutting particles of a grinding wheel resulting in a decreased rate of cutting is called",
    choices: ["grinding", "glazing", "fluting", "lapping"],
    answer: "glazing",
  },
  {
    question:
      "The process of increasing the cross-sectional area of a rivet portion or possibly of the whole piece.",
    choices: ["forging", "upsetting", "spreading", "drawing"],
    answer: "upsetting",
  },
  {
    question:
      "The process of lengthening a piece of stock while the cross-sectional area is being reduced.",
    choices: ["tapping", "honing", "drawing", "upsetting"],
    answer: "drawing",
  },
  {
    question: "Sometimes used for soldering bright tin",
    choices: ["tallow", "sal ammoniac", "tartar", "rosin"],
    answer: "rosin",
  },
  {
    question: "A very effective flux for soldering galvanized iron or zinc.",
    choices: ["soldering paste", "muriatic acid", "zinc chloride", "cut acid"],
    answer: "muriatic acid",
  },
  {
    question:
      "The groove provided for the cutting faces of the thread or teeth, chip passage and lubrication.",
    choices: ["heel", "land", "flute", "thread relief"],
    answer: "flute",
  },
  {
    question: "The surface below the cutting edge",
    choices: ["face", "flank", "toe", "side relief"],
    answer: "flank",
  },
  {
    question: "Which is the hardest material?",
    choices: ["steel", "diamond", "bronze", "brass"],
    answer: "diamond",
  },
  {
    question:
      "It measures the slope of top surface of the tool to the side in a direction perpendicular to the longitudinal axis.",
    choices: [
      "side rake angle",
      "side cutting edge angle",
      "side relief edge angle",
      "end relief angle",
    ],
    answer: "side rake angle",
  },
  {
    question: "A type of bonding material which is made of clay and water",
    choices: ["resinoid bond", "vitrified bond", "shellac bond", "rubber bond"],
    answer: "vitrified bond",
  },
  {
    question:
      "It is used for holding straight shank drills in the spindle of the machine when drilling",
    choices: ["drill chuck", "chuck key", "floating holder", "magnetic chuck"],
    answer: "drill chuck",
  },
  {
    question:
      "Back rake for HSS single-point cutting tool machining free-cutting brass is",
    choices: ["0 degrees", "5 degrees", "10 degrees", "15 degrees"],
    answer: "0 degrees",
  },
  {
    question: "A reamer is used to correct the",
    choices: [
      "size and roundness of a drilled hole",
      "finish and position of a drilled hole",
      "size and position of a drilled hole",
      "finish and depth of a drilled hole",
    ],
    answer: "size and roundness of a drilled hole",
  },
  {
    question: "An oversize hole is produced by a drill if",
    choices: [
      "lips of drill are of unequal length",
      "speed too high",
      "insufficient coolant used",
      "cutting speed is too high",
    ],
    answer: "lips of drill are of unequal length",
  },
  {
    question:
      "The major factors which determine the rpm of milling cutter are the materials being cut and the ______",
    choices: [
      "number of teeth in cutter",
      "diameter of cutter",
      "time allowed to complete the job",
      "depth of cutter",
    ],
    answer: "time allowed to complete the job",
  },
  {
    question: "The studs used as a coolant in machine shop consists of",
    choices: [
      "solution of detergent and water",
      "a straight mineral oil",
      "an emulsion of oil and water",
      "a chemical solution",
    ],
    answer: "an emulsion of oil and water",
  },
  {
    question: "Grinding is",
    choices: [
      "metal fusing operation",
      "metal powdering operation",
      "metal finishing operation",
      "none of the above",
    ],
    answer: "metal finishing operation",
  },
  {
    question: "Grinding is done wherever",
    choices: [
      "other machining operations cannot be carried out",
      "a large amount of material is to be removed",
      "high accuracy is required",
      "all of these",
    ],
    answer: "all of these",
  },
  {
    question: "Laser beam machining process is used to machine",
    choices: [
      "thicker materials",
      "thinner materials",
      "heavier materials",
      "stronger materials",
    ],
    answer: "thinner materials",
  },
  {
    question:
      "Twist drills are usually considered suitable machining holes having a length less than",
    choices: [
      "two times the diameter",
      "five times the diameter",
      "ten times the diameter",
      "twenty times the diameter",
    ],
    answer: "five times the diameter",
  },
  {
    question: "A high-grade grinding wheel is suitable for grinding",
    choices: [
      "hard materials",
      "soft materials",
      "both materials",
      "none of these",
    ],
    answer: "soft materials",
  },
  {
    question:
      "In the quick return mechanism of shaping machine, the ram stroke length is proportional to",
    choices: [
      "slotter arm length",
      "crank length",
      "ram length",
      "all of these",
    ],
    answer: "crank length",
  },
  {
    question:
      "The type and number of bearings to be used for spindles of machine tool depend on the",
    choices: [
      "type of spindle",
      "type of machine tool",
      "load on bearings",
      "all of the above",
    ],
    answer: "load on bearings",
  },
  {
    question:
      "Nitriding process of surface treatment for steel tools is used for taking",
    choices: ["light cuts", "heavy cuts", "medium cuts", "all of the above"],
    answer: "light cuts",
  },
  {
    question: "At very low cutting speeds, the tool wear is due to",
    choices: ["plowing action", "transfer", "material", "temperature"],
    answer: "plowing action",
  },
  {
    question:
      "Mixtures of hard cottonseed or rapeseed oils and mineral oils are",
    choices: ["cutting oils", "cooling oils", "heating oils", "emulsion"],
    answer: "cutting oils",
  },
  {
    question: "What is the material for hacksaw blade?",
    choices: [
      "high carbon steel",
      "high-speed steel",
      "low alloy steel",
      "any of the above",
    ],
    answer: "any of the above",
  },
  {
    question: "How is riveting done?",
    choices: ["cold pressing", "rolling", "drawing", "none of these"],
    answer: "cold pressing",
  },
  {
    question:
      "It is used to measure gap between two mating parts to set the job and machine in alignment and to measure clearance of piston and cylinders in automobiles.",
    choices: [
      "Compound Gauge",
      "Feeler Gauge",
      "Inspector Gauge",
      "Workshop Gauge",
    ],
    answer: "Feeler Gauge",
  },
  {
    question:
      "The movement of belt upon the face of rim or outer surface of the driver and the driver pulleys within the area of arc of contact.",
    choices: [
      "Compound Gauge",
      "Feeler Gauge",
      "Inspector Gauge",
      "Workshop Gauge",
    ],
    answer: "Feeler Gauge",
  },
  {
    question:
      "The movement of belt upon the face of rim or outer surface of the driver and the driver pulleys within the area of arc of contact.",
    choices: ["Slip", "Creep", "Interference", "Crowding"],
    answer: "Creep",
  },
  {
    question:
      "It is the process by which the length of a workpiece is reduced.",
    choices: ["Drawing", "Drifting", "Jumping", "Upsetting"],
    answer: "Jumping",
  },
  {
    question:
      "It cannot be forged because it will break if heated and beaten by hammer.",
    choices: ["High-speed steel", "Tool steel", "Carbon steel", "Cast iron"],
    answer: "Cast iron",
  },
  {
    question:
      "It is a process of enlarging and smoothing the punched hole by means of tapered drifts of various sizes and shapes.",
    choices: ["Drifting", "Drawing", "Jumping", "Upsetting"],
    answer: "Drifting",
  },
  {
    question: "Shaper tools are made of what type of material?",
    choices: ["Brass", "Bronze", "High-speed steel", "Babbitt"],
    answer: "High-speed steel",
  },
  {
    question: "An operator of enlarging the previously drilled hole.",
    choices: ["Drilling", "Boring", "Reaming", "Broaching"],
    answer: "Boring",
  },
  {
    question:
      "An operator to make smaller hole in exact center for lathe center.",
    choices: ["Broaching", "Reaming", "Counterboring", "Center boring"],
    answer: "Center boring",
  },
  {
    question:
      "The size of abrasive grains produced by crushing process is called...",
    choices: ["Grade", "Grit", "Grill", "None of the above"],
    answer: "Grit",
  },
  {
    question: "It is also known as slab peripheral milling.",
    choices: [
      "Form milling",
      "Climb milling",
      "Convex milling",
      "Plain milling",
    ],
    answer: "Plain milling",
  },
  {
    question: "It _____ the tool is released in return stroke.",
    choices: ["Shaper", "Planer", "Slotter", "Reamer"],
    answer: "Shaper",
  },
  {
    question:
      "It is the process of driving the periphery of the job in degrees.",
    choices: [
      "Direct indexing",
      "Plain indexing",
      "Differential indexing",
      "Angular indexing",
    ],
    answer: "Angular indexing",
  },
  {
    question: "It is a method of grinding cylindrical surfaces.",
    choices: [
      "Centerless grinding",
      "Plunge-cut grinding",
      "Through-feed grinding",
      "None of the above",
    ],
    answer: "Centerless grinding",
  },
  {
    question:
      "It is the angle between the side cutting edge and longitudinal axis of the tool.",
    choices: [
      "Side cutting edge angle",
      "End cutting edge angle",
      "Side relief angle",
      "End relief angle",
    ],
    answer: "Side cutting edge angle",
  },
  {
    question:
      "It is a surface finishing process and is used to produce a lustrous surface of attractive appearance.",
    choices: ["Polishing", "Buffing", "Lapping", "Glazing"],
    answer: "Buffing",
  },
  {
    question:
      "A ________ is formed when a shaft rotates in a bush, lines of the bore of a housing.",
    choices: [
      "Ball bearing",
      "Roller bearing",
      "Plain bearing",
      "Needle bearing",
    ],
    answer: "Plain bearing",
  },
  {
    question: "CNC in machine shop means",
    choices: [
      "Computer number control",
      "Computer numerical control",
      "Computer network control",
      "Communication network control",
    ],
    answer: "Computer numerical control",
  },
  {
    question:
      "It is the time lost due to breakdowns, waiting for tools, minor accidents, etc..",
    choices: ["Set up time", "Handling time", "Machining time", "Downtime"],
    answer: "Downtime",
  },
  {
    question:
      "Refers to the process of separating or removing the burning of combustible material from the neighborhood of the fire.",
    choices: ["Starvation", "Blanketing", "Cooling", "None of the above"],
    answer: "Starvation",
  },
  {
    question: "What is necessary to provide tolerance?",
    choices: [
      "It serves the labor charges",
      "It saves the material from wastage",
      "It saves the time",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "It is done then and there by adjusting or repairing the faults come in force during the work.",
    choices: [
      "Preventive maintenance",
      "Predictive maintenance",
      "Routine maintenance",
      "Corrective maintenance",
    ],
    answer: "Routine maintenance",
  },
  {
    question:
      "A ________ is used between the cutting tool and workpiece to minimize the friction heat.",
    choices: ["Lubricant", "Coolant", "Water", "Alcohol"],
    answer: "Coolant",
  },
  {
    question: "Which of the following is NOT a function of bearings?",
    choices: [
      "To support the shaft",
      "To guide the shaft",
      "To give free rotation to the shaft",
      "To transmit power",
    ],
    answer: "To transmit power",
  },
  {
    question:
      "It is a process of cleaning the face of grinding wheel by means of a dresser for removing the glazing and loading of wheel and improve the cutting action of a wheel.",
    choices: ["Dressing", "Polishing", "Trueing", "Lapping"],
    answer: "Dressing",
  },
  {
    question:
      "It is a long tapered punch used for loosening straight pins, rivets, and other small parts being disassembled.",
    choices: ["Drive-pin punch", "Hand punch", "Drift punch", "Center punch"],
    answer: "Drift punch",
  },
  {
    question: "A tool used for turning nuts or bolts.",
    choices: ["Pliers", "Wrench", "Locktite", "C-clamp"],
    answer: "Wrench",
  },
  {
    question: "A _______ is used to test accuracy of holes.",
    choices: ["Snap gauge", "Ring gauge", "Plug gauge", "Depth gauge"],
    answer: "Plug gauge",
  },
  {
    question:
      "A ______ consists of a hardened and ground steel bar in which two hardened and ground pins of the same diameter are set.",
    choices: ["Caliper", "Gauge block", "Sine bar", "Micrometer"],
    answer: "Sine bar",
  },
  {
    question:
      "________ are hardened devices with a taper shank at one end and a 60 degrees point at the other end.",
    choices: [
      "Tailstock centre",
      "Lathe centres",
      "Live centre",
      "Dead centre",
    ],
    answer: "Lathe centres",
  },
  {
    question: "It is large casting located on the left end of the bed.",
    choices: ["Tailstock", "Headstock", "Carriage", "Chuck"],
    answer: "Carriage",
  },
  {
    question: "A ______ is a thread that has a lead equal to pitch.",
    choices: [
      "Right hand thread",
      "Left hand thread",
      "Single thread",
      "Multiple thread",
    ],
    answer: "Single thread",
  },
  {
    question: "Used to permit lever shift for vertical travel rail.",
    choices: [
      "Ball crank",
      "Clamp plates",
      "Plunger knob",
      "None of the above",
    ],
    answer: "Plunger knob",
  },
  {
    question:
      "It is mounted on the top of column and is guided in perfect alignment by the machined dovetailed surface.",
    choices: ["Overarm", "Spindle", "Arbor", "Saddle"],
    answer: "Overarm",
  },
  {
    question:
      "Refers to circular milling attachment that is bolted to the top of the table of a plain or universal milling machine.",
    choices: [
      "Blotting attachment",
      "Rotary attachment",
      "Mill attachment",
      "Spiral attachment",
    ],
    answer: "Rotary attachment",
  },
  {
    question:
      "Name of mechanism, which a welding operator holds during gas welding and at the end of which the gases are burned to perform the various gas welding operations.",
    choices: ["Hose", "Torch", "Gauge", "Switch"],
    answer: "Torch",
  },
  {
    question: "A fine-grained siliceous rock used for sharpening edged tools.",
    choices: ["Oilstone", "Surface grinder", "Rocky oil", "None of the above"],
    answer: "Oilstone",
  },
  {
    question: "A hard tool used to measure engine crank web deflection.",
    choices: [
      "Feeler gauge",
      "Compound gauge",
      "Distortion gauge",
      "Dial gauge",
    ],
    answer: "Distortion gauge",
  },

  {
    question:
      "It is used to true and align machine tools, fixtures and workpieces.",
    choices: [
      "Dial indicator",
      "Radial indicator",
      "Dial gauge",
      "Feeler gauge",
    ],
    answer: "Dial indicator",
  },
  {
    question: "It is used for cutting long pieces of metals.",
    choices: ["Planer", "Shaper", "Power saw", "Broaching machine"],
    answer: "Power saw",
  },
  {
    question:
      "It is used for external, internal and relieving of mill cutters and taps.",
    choices: [
      "Milling attachment",
      "Thread attachment",
      "Taper attachment",
      "Relieving attachment",
    ],
    answer: "Relieving attachment",
  },
  {
    question: "Stretching or spreading of metal by hammering.",
    choices: ["Peening", "Flaring", "Upsetting", "Bending"],
    answer: "Peening",
  },
  {
    question: "The ________ is the most common of the standard tapers.",
    choices: ["Brown", "Jarno", "Sharp", "Morse"],
    answer: "Morse",
  },
  {
    question:
      "The ability of metal to stretch, bend or twist without breaking or cracking is called...",
    choices: ["Elasticity", "Ductility", "Brittleness", "Plasticity"],
    answer: "Ductility",
  },
  {
    question: "A fine-grained siliceous rock used for sharpening edge tools.",
    choices: ["Eutectoid", "Austenite", "Oilstone", "Pearlite"],
    answer: "Oilstone",
  },
  {
    question: "Machining properties of steel can be improved by adding...",
    choices: [
      "Chromium nickel",
      "Silicon, aluminum, titanium",
      "Sulfur, lead, phosphorus",
      "Vanadium, aluminum",
    ],
    answer: "Sulfur, lead, phosphorus",
  },
  {
    question: "A ductile fracture is characterized by...",
    choices: [
      "Appreciable plastic deformation prior to propagation of crack",
      "Fragmentation into more than two pieces",
      "Negligible deformation",
      "Rapid rate of crack propagation",
    ],
    answer: "Appreciable plastic deformation prior to propagation of crack",
  },
  {
    question: "Tool can be hardened by...",
    choices: [
      "Heating red hot and plunging into water",
      "Heating red hot and cooling in blast of air",
      "Heating red hot and plunging into linseed or cottonseed oil",
      "Any of the above, depending on type",
    ],
    answer: "Any of the above, depending on type",
  },
  {
    question: "The purpose of annealing is to make the metal...",
    choices: ["Harder", "Medium hard", "Softer", "Shiny"],
    answer: "Softer",
  },
  {
    question: "The purpose of tempering is to make metal...",
    choices: ["Softer", "Harder", "Less brittle", "More brittle"],
    answer: "Less brittle",
  },
  {
    question: "A scriber is made of...",
    choices: [
      "Carbon tool steel",
      "Cold-rolled steel",
      "Hot-rolled steel",
      "Tool steel",
    ],
    answer: "Tool steel",
  },
  {
    question:
      "It is used in steels as an alloying element to combine hardness obtained.",
    choices: ["Vanadium", "Chromium", "Titanium", "Molybdenum"],
    answer: "Chromium",
  },
  {
    question:
      "It is a process of shearing in which sheet or plate is cut out to a definite outline in a press.",
    choices: ["Blanking", "Embossing", "Clamping", "Trimming"],
    answer: "Blanking",
  },
  {
    question:
      "It is the characteristic of exhibiting different properties when tested in different directions.",
    choices: ["Allotropy", "Anisotropy", "Isotropy", "Isotropic"],
    answer: "Anisotropy",
  },
  {
    question:
      "It is one in which specimen supported at both ends as a simple beam is broken by the impact strength.",
    choices: ["Charpy test", "Izod test", "Rockwell test", "Universal test"],
    answer: "Charpy test",
  },
  {
    question:
      "Which of the following metals has the highest specific heat capacity at 100ºC?",
    choices: ["Aluminum", "Bismuth", "Copper", "Iron"],
    answer: "Aluminum",
  },
  {
    question:
      "Which of the following types of packing would be used in steam joints?",
    choices: ["Asbestos", "Neoprene", "Metallic", "A or C"],
    answer: "A or C",
  },
  {
    question:
      "The process applied to iron pipe which retards corrosion, is called...",
    choices: ["Galvanizing", "Annealing", "Soldering", "Tinning"],
    answer: "Galvanizing",
  },
  {
    question: "A scriber is made from what metal...",
    choices: [
      "Carbon steel",
      "Cold rolled steel",
      "Tool steel",
      "Hot rolled steel",
    ],
    answer: "Tool steel",
  },

  {
    question:
      "The best file to use when finishing sharp corners or slots and grooves.",
    choices: ["Jewelers file", "Knife file", "Mill file", "Square file"],
    answer: "Knife file",
  },
  {
    question: "Never use a file...",
    choices: [
      "That is dirty",
      "With a tang",
      "Without a handle",
      "Without oiling",
    ],
    answer: "Without a handle",
  },
  {
    question:
      "Which of the following information is necessary when ordering a file?",
    choices: ["Size", "Shape", "Type of teeth", "All of the above"],
    answer: "All of the above",
  },
  {
    question:
      "When filing a piece of metal on a lathe, if short quick strokes are used, the finished piece will probably...",
    choices: [
      "Be out of round",
      "Be perfect",
      "Have small flat areas on the surfaces",
      "A and C",
    ],
    answer: "A and C",
  },
  {
    question:
      "The best procedure when filing a piece of metal on a lathe is to take...",
    choices: [
      "Long fast strokes",
      "Long slow strokes",
      "Short even strokes",
      "Short fast strokes",
    ],
    answer: "Long slow strokes",
  },
  {
    question:
      "Small pieces of metal clogged between the teeth of a file are called...",
    choices: ["Pits", "Bumps", "Clogs", "Flats"],
    answer: "Clogs",
  },
  {
    question:
      "Finishing of a piece of metal with a real smooth finish can be done by...",
    choices: ["Draw filing", "Flat filing", "Mill filing", "Side filing"],
    answer: "Draw filing",
  },
  {
    question:
      "For finishing a piece of work to size, the file to use is the...",
    choices: [
      "Crosscut file",
      "Double cut flat file",
      "Mill file",
      "Single cut flat file",
    ],
    answer: "Single cut flat file",
  },
  {
    question: "For filing lead or babbitt, use a...",
    choices: ["Lead float file", "Mill file", "Vixen file", "A or C"],
    answer: "A or C",
  },
  {
    question: "Hacksaw blade with 32 TPI is best suited for cutting...",
    choices: [
      "Small tubing",
      "Conduit",
      "Sheet metal under 18 gauge",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "A coolant is usually used when cutting material in a power hacksaw to...",
    choices: [
      "Absorb heat friction",
      "Prevent the blade from overheating",
      "Prevent the blade from losing its temper",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "A hacksaw blade with 18 TPI is best suited for cutting...",
    choices: ["Aluminum", "Cast iron", "Solid iron", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "When cutting a long thin piece of metal...",
    choices: [
      "Set the blade in the frame with teeth facing toward",
      "Turn blade at right angle to the frame",
      "Turn the blade upside down",
      "None of the above",
    ],
    answer: "Turn blade at right angle to the frame",
  },
  {
    question: "The hacksaw blade should be placed in the frame with...",
    choices: [
      "One end looser than the other end",
      "The teeth facing in any position",
      "The teeth pointing backward",
      "The teeth pointing forward",
    ],
    answer: "The teeth pointing forward",
  },
  {
    question: "A hacksaw blade with 34 TPI should be used for cutting...",
    choices: ["Brass", "Cast iron", "Thin wall tubing", "Heavy metal"],
    answer: "Thin wall tubing",
  },
  {
    question: "An all-hard hacksaw blade is best suited for...",
    choices: ["Brass", "Cast iron", "Tool steel", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "A hacksaw blade with 14 TPI is best suited for...",
    choices: [
      "Cold rolled steel",
      "Hot rolled steel",
      "Structural steel",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "Files are divided into two general classes, namely...",
    choices: [
      "Flat shapes and round shapes",
      "Large and small",
      "Rough and smooth",
      "Single cut and double cut",
    ],
    answer: "Single cut and double cut",
  },
  {
    question: "A hacksaw blade can be placed in a frame in...",
    choices: [
      "Three positions",
      "Two positions",
      "One position",
      "Four positions",
    ],
    answer: "Four positions",
  },
  {
    question: "A hard hacksaw blade is one that...",
    choices: [
      "Has a hard back and flexible teeth",
      "Has a flexible back and hard teeth",
      "Has the entire teeth hardened",
      "Will fit a solid frame",
    ],
    answer: "Has the entire teeth hardened",
  },
  {
    question: "Hacksaw blade with 24 TPI is best suited for cutting...",
    choices: [
      "Brass and copper",
      "Sheet metal over 18 gauge",
      "Tubing",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "Hacksaw blades are made of...",
    choices: [
      "High-speed steel",
      "Tool steel",
      "Tungsten alloy steel",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "A flexible hacksaw blade is one that has...",
    choices: [
      "A movable back",
      "Flexible ends",
      "Only the back hardened",
      "Only the teeth hardened",
    ],
    answer: "Only the teeth hardened",
  },
  {
    question: "The flexible type hacksaw blade is best suited for...",
    choices: ["Aluminum", "Chattel", "Tubing", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "When lathe tool bit burns, it means that...",
    choices: [
      "Speed is too low",
      "Speed is too fast",
      "Material is too hard",
      "Material cannot bend",
    ],
    answer: "Speed is too fast",
  },
  {
    question: "The lathe compound is used for...",
    choices: ["Angle cutting", "Grooving", "Facing", "Any of the above"],
    answer: "Any of the above",
  },
  {
    question: "The jaws of a standard vise are...",
    choices: ["Hard", "Soft", "Semihard", "Semisoft"],
    answer: "Hard",
  },
  {
    question:
      "When facing a piece of material in a lathe chuck, the bit must be set...",
    choices: [
      "Above center",
      "At the center",
      "Below the center",
      "Off center",
    ],
    answer: "At the center",
  },
  {
    question: "Before applying layout on a piece, it must be...",
    choices: ["Cleaned", "Cold", "Hot", "Roughened"],
    answer: "Cleaned",
  },
  {
    question: "Tool steel can be hardened by...",
    choices: [
      "Heating red hot and plunging into water",
      "Heating red hot and cooling in blast of dry air",
      "Heating red hot and plunging into linseed or cottonseed oil",
      "Any of the above, depending on the type and use",
    ],
    answer: "Any of the above, depending on the type and use",
  },
  {
    question:
      "A piece of mild steel held against an emery wheel will give off...",
    choices: [
      "Bright shiny sparks",
      "Yellow sparks",
      "Light straw-colored sparks",
      "No sparks",
    ],
    answer: "Light straw-colored sparks",
  },
  {
    question: "Another name for hydrochloric acid is...",
    choices: ["Acetic acid", "Muriatic acid", "Nitric acid", "Sulfuric acid"],
    answer: "Muriatic acid",
  },
  {
    question: "A flexible hacksaw blade has a tendency to...",
    choices: [
      "Snap easily",
      "Buckle or rut out of the file when too much pressure is supplied",
      "Cut too fast",
      "Cut at a slant",
    ],
    answer: "Buckle or rut out of the file when too much pressure is supplied",
  },
  {
    question: "A pillar file is used for...",
    choices: [
      "Filing against a shoulder",
      "Filing keyways",
      "Filing slots",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "The length of a file is used for...",
    choices: ["End to end", "Heel to end", "Point to end", "Point to heel"],
    answer: "Point to heel",
  },
  {
    question: "A pillar file has...",
    choices: ["One safe edge", "Three safe edges", "Two safe edges", "A and C"],
    answer: "A and C",
  },
  {
    question: 'The "tang" is a part of a file that...',
    choices: [
      "Does the cutting",
      "Fits into the handle",
      "Has no teeth",
      "Is opposite the handle",
    ],
    answer: "Fits into the handle",
  },
  {
    question:
      "One of the factors involved in the choice of a grinding wheel is...",
    choices: [
      "The kind of material to be ground",
      "The amount of stock to be removed",
      "The kind of finish required",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "The main difference between a planer and a shaper is that...",
    choices: [
      "The planer has an offset table and the shaper has a horizontal table",
      "The shaper has a rotating table and planer has a horizontal table",
      "The table of planer has a reciprocating motion past the tool head while the table of the shaper is stationary and the tool head has a reciprocating motion",
      "One is larger than the other",
    ],
    answer:
      "The table of planer has a reciprocating motion past the tool head while the table of the shaper is stationary and the tool head has a reciprocating motion",
  },
  {
    question:
      "A piece of tool steel is held against an emery wheel will give off...",
    choices: [
      "White sparks with stars at the end",
      "Yellow sparks",
      "Dull sparks",
      "Green sparks",
    ],
    answer: "White sparks with stars at the end",
  },
  {
    question:
      "If you use a dry grinding wheel for sharpening tool bits, dip the end of the bit in water frequently to prevent...",
    choices: [
      "Attenuating the cutting edge of the bit",
      "Burning your fingers",
      "Hardening of the tip",
      "The tip from crystallizing",
    ],
    answer: "Attenuating the cutting edge of the bit",
  },
  {
    question: "The tool used to check internal pipe threads is called...",
    choices: ["Thread gauge", "Plug gauge", "Center gauge", "Thread gauge"],
    answer: "Plug gauge",
  },
  {
    question: "The tool used to check external pipe threads is called...",
    choices: ["Thread gauge", "Plug gauge", "Pitch gauge", "Center gauge"],
    answer: "Thread gauge",
  },
  {
    question: "The operation of truing a grinding wheel is known as...",
    choices: ["Dressing", "Cutting", "Rounding", "Sizing"],
    answer: "Dressing",
  },
  {
    question: "The cutting angle of a drill for mild steel should be...",
    choices: ["25 degrees", "69 degrees", "59 degrees", "79 degrees"],
    answer: "59 degrees",
  },
  {
    question: "Which of the following is not a common drill shank?",
    choices: ["Bit", "Fluted", "Straight", "Tapered"],
    answer: "Fluted",
  },
  {
    question: "Tapered shanks are used on a large drill press so that...",
    choices: [
      "The drill can be centered more easily",
      "The drill can be easily forced out of the sleeve with a drift",
      "The shank can be removed when hot",
      "The shank will not turn when cutting",
    ],
    answer: "The drill can be easily forced out of the sleeve with a drift",
  },
  {
    question:
      "A tool bit for cutting American National Thread should be ground with a...",
    choices: [
      "30-degree angle",
      "45-degree angle",
      "60-degree angle",
      "56-degree angle",
    ],
    answer: "60-degree angle",
  },
  {
    question: "Center drilling is the operation of...",
    choices: [
      "Drilling a center in an odd-shaped piece of metal",
      "Drilling and countersinking with one tool",
      "Countersinking with one tool and drilling with another",
      "Drilling a center in a piece of stock in a drill press",
    ],
    answer: "Drilling and countersinking with one tool",
  },
  {
    question: "When cutting a drill, it will squeal due to...",
    choices: [
      "Drill being ground properly",
      "Drill being too hot",
      "Insufficient lubrication",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: "The correct cutting angle of a drill for ordinary work is...",
    choices: ["45 degrees", "59 degrees", "65 degrees", "50 degrees"],
    answer: "59 degrees",
  },
  {
    question:
      "If the cutting edges of the drill are cut at different angles...",
    choices: [
      "The drill will not cut",
      "The hole will be larger than the drill",
      "The hole will be smaller than the drill",
      "None of the above",
    ],
    answer: "The hole will be larger than the drill",
  },
  {
    question: "If the drill speed is too great, it will...",
    choices: ["Cut faster", "Lose its temper", "Cut slower", "Not cut"],
    answer: "Lose its temper",
  },
  {
    question:
      "Soda added to water is used for cooling instead of plain water because...",
    choices: [
      "It reduces the heat generated",
      "It improves the finish",
      "It overcomes rusting",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "If the angle of the drill is less than 59 degrees...",
    choices: [
      "The drill will make a larger hole",
      "The drill will make a smaller hole",
      "The hole will take longer to drill and more power is required to drive the drill",
      "The drill will not center properly",
    ],
    answer:
      "The hole will take longer to drill and more power is required to drive the drill",
  },
  {
    question: "The name of shank used for drilling is...",
    choices: ["Statley", "Starret", "Miller", "Morse"],
    answer: "Morse",
  },
  {
    question: "The tool used to cut threads on pipe is called...",
    choices: ["Pipe tool", "Pipe vise", "Pipe stock", "Pipe thread"],
    answer: "Pipe stock",
  },
  {
    question:
      "The instrument used to reshape a grinding wheel that is rounded or cut off round is called...",
    choices: ["Wheel cutter", "Wheel slitter", "Wheel emery", "Wheel dresser"],
    answer: "Wheel dresser",
  },
  {
    question:
      "The instrument used to remove old packing glands and stuffing boxes...",
    choices: [
      "Packing tools",
      "Packing bills",
      "Gland box clearance",
      "Packing stuff",
    ],
    answer: "Packing tools",
  },
  {
    question: "Before drilling a hole in a piece of metal, it should be...",
    choices: ["Center punched", "Marked with chalk", "Protracted", "Scribed"],
    answer: "Center punched",
  },
  {
    question: "When measuring a drill for size, measure across the...",
    choices: ["Shank", "Flute", "Lip", "Margin"],
    answer: "Margin",
  },
  {
    question: "The size of a drill is stamped on the...",
    choices: ["Flute", "Shank", "Margin", "Point"],
    answer: "Shank",
  },
  {
    question: "The tool used for cleaning files is called...",
    choices: ["File cleaner", "File card", "File oilstone", "Scraper"],
    answer: "File card",
  },
  {
    question:
      "Back rake angle for high-speed steel single point cutting tool to machine free cutting brass is...",
    choices: ["0 degrees", "5 degrees", "30 degrees", "10 degrees"],
    answer: "0 degrees",
  },
  {
    question: "A reamer is used to correct the...",
    choices: [
      "Size and roundness of a drilled hole",
      "Size and position of drilled hole",
      "Finish and position of drilled hole",
      "Depth of drilled hole",
    ],
    answer: "Size and roundness of a drilled hole",
  },
  {
    question:
      "Which of the following is not a common term related to the classification of file?",
    choices: ["Tucking", "Stud", "Bound", "Medium force fit"],
    answer: "Bound",
  },
  {
    question: "An oversized hole is produced by a drill if...",
    choices: [
      "Lips of a drill are of unequal length",
      "Feed is too high",
      "Insufficient coolant is used",
      "None of the above",
    ],
    answer: "Lips of a drill are of unequal length",
  },
  {
    question:
      "The studs are used as coolant in internal machine shop consists of...",
    choices: [
      "Solution of detergent and water",
      "An emulsion of oil and water",
      "Chemical solution",
      "A straight mineral oil",
    ],
    answer: "An emulsion of oil and water",
  },
  {
    question:
      "Two major factors which determine the rpm of milling cutter are the material being cut and...",
    choices: [
      "Number of teeth in cutter",
      "Time allowed to finish the job",
      "Diameter less under",
      "Depth",
    ],
    answer: "Time allowed to finish the job",
  },
  {
    question:
      "Electron beam machining process is quite suitable for materials having...",
    choices: [
      "High melting point and high thermal conductivity",
      "High melting point and low thermal conductivity",
      "Low melting point",
      "Low thermal conductivity",
    ],
    answer: "High melting point and low thermal conductivity",
  },
  {
    question: "Grinding is what type of operation?",
    choices: [
      "Metal finish operation",
      "Metal fusion operation",
      "Metal powdering operation",
      "None of the above",
    ],
    answer: "Metal finish operation",
  },
  {
    question: "Grinding is done wherever...",
    choices: [
      "Other machining operations",
      "A large amount of materials to be removed",
      "High accuracy is required",
      "Any of the above",
    ],
    answer: "A large amount of materials to be removed",
  },
  {
    question: "Laser beam machining process is used to machine...",
    choices: [
      "Thicker material",
      "Thinner material",
      "Heavy materials",
      "Light materials",
    ],
    answer: "Thinner material",
  },
  {
    question:
      "Twist drills are usually considered suitable for machining holes having a length less than...",
    choices: [
      "Two times its diameter",
      "Five times its diameter",
      "Four times its diameter",
      "Eight times its diameter",
    ],
    answer: "Five times its diameter",
  },
  {
    question: "A hard grade grinding wheel is suitable for...",
    choices: [
      "Hard materials",
      "Soft materials",
      "Semi-hard materials",
      "Heavy load materials",
    ],
    answer: "Soft materials",
  },
  {
    question:
      "In quick return mechanism of shaping machine, the ram stroke length is proportional to...",
    choices: ["Crank length", "Cam length", "Ram length", "None of the above"],
    answer: "Crank length",
  },
  {
    question:
      "The usual ratio of forward and return stroke in quick return mechanism of shaping machine is...",
    choices: ["2:1", "4:3", "3:2", "5:2"],
    answer: "3:2",
  },
  {
    question:
      "The type and number of bearings to be used for spindles of machine depends on...",
    choices: [
      "Type of spindle",
      "Type of cutter",
      "Load on bearings",
      "Any of the above",
    ],
    answer: "Load on bearings",
  },
  {
    question:
      "The square head of combination set is used for marking or checking the entire angle...",
    choices: [
      "90 degrees only",
      "45 degrees",
      "90 and 45 degrees",
      "Any angle between 0-180 degrees",
    ],
    answer: "90 and 45 degrees",
  },
  {
    question:
      "For internal work, the cutting angle of a cold chisel is ground at an angle of...",
    choices: ["50 degrees", "60 degrees", "80 degrees", "70 degrees"],
    answer: "60 degrees",
  },
  {
    question: "Angle plate is made of...",
    choices: [
      "Closed grain cast iron",
      "Cast steel",
      "High-speed steel",
      "Tool steel",
    ],
    answer: "Closed grain cast iron",
  },
  {
    question: "A new hacksaw blade should be used to old cut because...",
    choices: [
      "The blade is very costly",
      "The space is not sufficient to play the new blade in the old cut",
      "The blade has very sharp teeth",
      "None of the above",
    ],
    answer: "The space is not sufficient to play the new blade in the old cut",
  },
  {
    question: "Which part of the file is not hardened...",
    choices: ["Tang", "Heel", "Point", "Handle"],
    answer: "Tang",
  },
  {
    question: "Generally, spiral fluted reamer has spirals of...",
    choices: ["Right hand", "Left hand", "Straight", "Any of the above"],
    answer: "Left hand",
  },
  {
    question: "In which screw thread the side = width of space - 0.5p...",
    choices: ["Knuckle", "Buttress", "Square", "Circle"],
    answer: "Square",
  },
  {
    question: "A stud is which...",
    choices: [
      "Have threads at one end",
      "Require a nut",
      "Inserted in a plate hole",
      "None of the above",
    ],
    answer: "None of the above",
  },
  {
    question: '"18-8" stainless steel means...',
    choices: [
      "18% tungsten and 8% chromium",
      "18% nickel and 8% chromium",
      "18% chromium and 8% nickel",
      "18% cobalt and 8% cadmium",
    ],
    answer: "18% nickel and 8% chromium",
  },
  {
    question: "Which is the lightest metal...",
    choices: ["Lead", "G.I. steel", "Aluminum", "Cast iron"],
    answer: "Aluminum",
  },
  {
    question: "Hardened steel parts have...",
    choices: ["Fine grains", "Coarse grains", "No grains", "Medium grains"],
    answer: "Fine grains",
  },
  {
    question: "Concentricity of an outside diameter can be checked by...",
    choices: [
      "Vernier caliper",
      "Outside micrometer",
      "Dial test indicator",
      "Tube micrometer",
    ],
    answer: "Dial test indicator",
  },
  {
    question: "Which gauge is used to check internal threads...",
    choices: [
      "Ring gauge",
      "Plug gauge",
      "Thread plug gauge",
      "None of the above",
    ],
    answer: "Thread plug gauge",
  },
  {
    question:
      "In case of limit of plug gauge, which size will not enter into the hole...",
    choices: [
      '"GO" size',
      '"Not GO" size',
      '"A and B" both',
      "None of the above",
    ],
    answer: '"Not GO" size',
  },
  {
    question:
      "Limit gauge is made to the ______ sizes of the work to be measured...",
    choices: [
      "Actual and nominal",
      "Nominal and upper limit",
      "Maximum and minimum",
      "Nominal and upper limit",
    ],
    answer: "Maximum and minimum",
  },
  {
    question: '"GO" size limits is...',
    choices: [
      "Upper limit of shaft",
      "Lower limit of hole",
      "Both A and B",
      "Neither A or B",
    ],
    answer: "Both A and B",
  },
  {
    question: "Lapping is done...",
    choices: [
      "To finish the job to a degree",
      "To control the size",
      "To get high-quality surface",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "In which method a bore is finished to a very close tolerance...",
    choices: ["Lapping", "Rapping", "Honing", "Grinding"],
    answer: "Honing",
  },
  {
    question: "Jig bushings are internally made of...",
    choices: ["Tool steel", "Carbon steel", "Cast iron", "High-speed steel"],
    answer: "Tool steel",
  },
  {
    question: "Fixture clamps are internally made of...",
    choices: [
      "Tool steel",
      "Case hardened mild steel",
      "High-speed steel",
      "Carbon steel",
    ],
    answer: "Case hardened mild steel",
  },
  {
    question:
      "When an external gear is meshed with the internal gear, the gears will rotate in...",
    choices: [
      "Same direction",
      "Opposite direction",
      "Will not rotate",
      "None of the above",
    ],
    answer: "Same direction",
  },
  {
    question: "Usual ratio of soluble oil and water used in coolant is...",
    choices: ["20:1", "1:20", "10:1", "1:10"],
    answer: "1:20",
  },
  {
    question:
      "In internal cylindrical grinding, the grinding wheel and work rotate in...",
    choices: [
      "Same direction",
      "Opposite direction",
      "Neither A or B",
      "Both A and B",
    ],
    answer: "Opposite direction",
  },
  {
    question:
      "For grinding materials having low tensile strength, which abrasive is used...",
    choices: ["Silicon carbide", "Aluminum oxide", "Emery", "Corundum"],
    answer: "Silicon carbide",
  },
  {
    question:
      "Which center is used for supporting open end of pipes, shells, etc., while turning or thread cutting...",
    choices: ["Ball center", "Pipe center", "Half center", "Dead center"],
    answer: "Pipe center",
  },
  {
    question: "Included angle of dead center is...",
    choices: ["60 degrees", "45 degrees", "65 degrees", "90 degrees"],
    answer: "60 degrees",
  },
  {
    question: "Included angle of B.A screw thread is...",
    choices: ["90 degrees", "47.5 degrees", "60 degrees", "45 degrees"],
    answer: "47.5 degrees",
  },
  {
    question: "Main alloying element of HSS is...",
    choices: ["Chromium", "Cast iron", "Tungsten", "Carbon steel"],
    answer: "Tungsten",
  },
  {
    question: "For accurate measurement of bores, the best instrument is...",
    choices: [
      "Vernier caliper",
      "Plug gauge",
      "Dial indicator",
      "Inside micrometer",
    ],
    answer: "Inside micrometer",
  },
  {
    question: "In hydraulic drive shaper, the metal is removed at...",
    choices: [
      "Lower speed",
      "Higher speed",
      "Average speed",
      "None of the above",
    ],
    answer: "Higher speed",
  },
  {
    question:
      "In shaper machine, the cutting speed (metric) is expressed as...",
    choices: ["m/s", "m/min", "m/hr", "Any of the above"],
    answer: "m/min",
  },
  {
    question:
      "Amount of automatic lead in shaper is increased by taking the crank pin...",
    choices: [
      "At center of crank disc",
      "Away from the center",
      "Towards the center",
      "At the center",
    ],
    answer: "Away from the center",
  },
  {
    question: "In a shaper, the feed (metric) is usually expressed as...",
    choices: ["Mm/stroke", "M/min", "Mm/revolution", "None of the above"],
    answer: "Mm/stroke",
  },
  {
    question: "For cutting gear teeth in shaper, the _____ tool is used...",
    choices: ['"V" block', "Form tool", "Gooseneck", "Round nose"],
    answer: "Form tool",
  },
  {
    question:
      "The standard ratio of cutting tool in return stroke in shaping is...",
    choices: ["3:1", "1:3", "3:2", "4:2"],
    answer: "3:2",
  },
  {
    question: "The feed in the shaper takes place at...",
    choices: [
      "The beginning of return stroke",
      "The middle of return stroke",
      "The end of return stroke",
      "At the cutting stroke",
    ],
    answer: "The end of return stroke",
  },
  {
    question:
      "Which of the following quick return mechanisms is most widely used in most slotters...",
    choices: [
      "Slotter link and gear mechanism",
      "Whitworth mechanism",
      "Slotter disc mechanism",
      "Hydraulic mechanism",
    ],
    answer: "Whitworth mechanism",
  },
  {
    question:
      "If the clearance angle is more than the required on slotter tool, the support cutting tool will be...",
    choices: ["Great", "Less", "Medium", "None of the above"],
    answer: "Less",
  },
  {
    question:
      "The clamping block used to support the end of the strap is made of...",
    choices: ["Wood", "Steel", "HSS", "Cast iron"],
    answer: "Wood",
  },
  {
    question: "Divide table plater has...",
    choices: ["One table", "Two tables", "One housing", "Two housings"],
    answer: "Two tables",
  },
  {
    question: "A plater which has a cutting tool in or both strokes is...",
    choices: [
      "Open side plater",
      "Double housing plater",
      "Universal plater",
      "Pit plater",
    ],
    answer: "Universal plater",
  },
  {
    question: "The straddle milling is done by means of two...",
    choices: [
      "Side milling cutters",
      "Plain milling cutters",
      "Face milling cutters",
      "Form cutters",
    ],
    answer: "Side milling cutters",
  },
  {
    question:
      "The formula to find out the number of turns of the crank for simple indexing is:",
    choices: ["T = 20/N", "T = N/40", "T = 40/N", "T = N/20"],
    answer: "T = 40/N",
  },
  {
    question:
      "In standard dividing head, the ratio between worm wheel and the worm is...",
    choices: ["40:1", "20:1", "1:40", "10:1"],
    answer: "40:1",
  },
];

export type Questions = (typeof questionsData)[0];

export default function M6() {
  const navScore = useScore();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const from = pageParam === 1 ? 0 : (pageParam - 1) * 10;
      const to = from + 9;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return questionsData.slice(from, to);
    },
    queryKey: ["questions-m6"],
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
  });
  const questions = data?.pages.flatMap((question) => question);

  const lastPost = useRef<HTMLDivElement>(null);

  const { ref: veryLastPost, entry } = useIntersection({
    root: lastPost.current,
    threshold: 1,
  });

  type Score = {
    score: number;
    setScore: (score: number) => void;
  };

  const createStore = (name: string) =>
    create<Score>()(
      persist(
        (set) => ({
          score: 0,
          setScore: (score: number) => set({ score: score }),
        }),
        { name: name }
      )
    );

  const currentModuleScoreStore = createStore("m6-score");

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  return (
    <main className="h-full w-full grid-cols-1 grid p-4 sm:px-8 md:px-32 lg:px-64 xl:px-80 gap-4 overflow-auto">
      {questions?.map((question) => {
        return (
          <Question
            correct={() => {
              navScore.setScore(navScore.score + 1);
            }}
            question={question}
            key={question.question}
          />
        );
      })}
      <div ref={veryLastPost} className="w-full" />
      {isFetchingNextPage && (
        <p className="text-center text-xs animate-pulse">
          Loading more questions
        </p>
      )}
    </main>
  );
}
