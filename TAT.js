
const textElemnt = document.getElementById('text');
const options = document.getElementById('option-buttons');

let state = {};

function toggleTheme() {
  const root = document.documentElement;
  const theme = root.getAttribute("preferred-theme");
  const torch = document.getElementById("theme-toggle");
  
  root.setAttribute(
    "preferred-theme",
    theme === "light" ? "dark" : "light"
  );

  torch.textContent = theme === "light" ? "☼" : "\u263E";
}


function startGame(){
    state = {} ;
    showTextNode(0)
}

function showTextNode(textNodeIndex){
   const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
   
   textElemnt.innerText = textNode.text;

   // 🔥 reset animation
   textElemnt.style.animation = 'none';        // remove animation
   void textElemnt.offsetWidth;                // trigger reflow (forces browser to acknowledge the reset)
   textElemnt.style.animation = '';            // reapply animation from CSS

   // Clear old buttons
   while(options.firstChild){
        options.removeChild(options.firstChild)
   }
    
   textNode.options.forEach(option => {
       if(showOption(option)) {
         const button = document.createElement('button');
         button.innerText = option.text;
         button.classList.add('btn');
         button.addEventListener('click', () => selectOption(option));
         options.appendChild(button);
       }
   })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId < 0){
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const deathTags = [
    `Maybe next time around you'll consider more plausible choices for someone with your... unfortunate disposition.`,
    `Timmy, at least die with some semblance of grace. Convulsing like an newborn is no way for the choosen to perish.`,
    `Tsk, tsk... the prophecy foretold of heroic deeds, not the pantomime of a dying child.`,
    `You have met a terrible fate, haven't you? Now, now, once more, to the brink with you.`,
    `Ah, how poetic. The child who dreamt of glory ends bloated in his own mediocrity.`,
    `Timothy, bravery without thought is just suicide with extra steps.`,
    `The ballads written about you will be mired with notes of laughter... and not much else.`,
    `You've fallen, Timmy, but take comfort in the fact that gravity has never judged the weak.`
];
const deathTagGenerator = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const textNodes = [
    {
        id: 0,
        text:`You will die often but don't let this simple truth discourage you.`,
        options: [
            {
                text: `Start Game`,
                nextText: 1
            }
        ]
    },
    {
    id: 1,
    text: `The serendipity of an orphan has landed you in a rat-infested hostile roomed with a burlap sack for a cloak and rat hide for boots. In the room, there are a few items that might assist you in your unfortunate adventure.`,
    options: [
        {
            text: `Pick up the damp stick covered in urine.`,
            setState: {stick: true},
            nextText: 2
    },
        {
            text: `Grab the small hood made from a burlap cloak.`,
            setState: {hood: true},
            nextText: 2
    },
        {
            text: `Store the partially eaten, molded cheese.`,
            setState: {cheese: true},
            nextText: 2
    },
        {
            text: `Take nothing but your clothes, you're pretty confident.`,
            nextText: 2
    }
        ]
    },
    {
        id: 2,
        text: `You exit your living quarters to face your morning dose of hardship. A stout boy winding his stump leg to kick you in the testicles, as is the fate of the unfortunate. How do you navigate around this rotund piglet?`,
        options: [
            {
                text: `Attempt to strike him with the stick.`,
                requiredState: (currentState) => currentState.stick,
                setState: {stick: false},
                nextText: 3
            },
            {
                text: `Use the stick as a cane to fool the boy.`,
                requiredState: (currentState) => currentState.stick,
                setState: {stick: false, oldFoolsDeath: true},
                nextText: 4
            },
            {
                text: `Put hood over testes as armor.`,
                requiredState: (currentState) => currentState.hood,
                setState: {hood: false, testeArmorDeath: true},
                nextText: 4
            },
            {
                text: `Wear the hood as a normal human would and leave outside.`,
                requiredState: (currentState) => currentState.hood,
                setState: {hood: false, hoodUp: true, runaway: true},
                nextText: 5
            },
           {
                text: `Eat the cheese to get a blessing from the rat god.`,
                requiredState: (currentState) => currentState.cheese,
                setState: {cheese: false, ratGodDeath: true},
                nextText: 4
            },
            {
                text: `Offer the cheese to satiate the little piggy.`,
                requiredState: (currentState) => currentState.cheese,
                setState: {cheese: false, companionDanny: true},
                nextText: 6
            },
            {
                text:`Start dancing to alter his anger into arousal.`,
                setState: {confusedSexualFrustration: true},
                nextText: 4
            },
            {
                text:`Look him in the eyes and remain motionless to garner his respect.`,
                setState: {anIdiotsDeath: true},
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: `You grasp the rancid stick in your juvenile palms and attempt to gather Chi of some sort to perform a strike. A strike that will split the heavens… But as you begin to close your eyes you feel a heavy weight added to the stick and feel a very warm liquid cascade around your hands that begin to tremble. You know what happened.`,
        options: [
            {
                text: `Attempt to tell the abusive matron your side of the story.`,
                setState:{hanging: true},
                nextText: 7
            },
                {
                text: `Run Outside.`,
                setState:{coveredInBlood: true},
                nextText:5
            },
            {
                text: `Find the matron and say you were attacked by wolves.`,
                setState:{aDogsDeath: true},
                nextText: 7
            },
            {
                text: `Walk into the dining hall and act as if nothing happened.`,
                setState:{caughtRedHanded: true},
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: deathTagGenerator(deathTags),
        options: [
            {
                text: `The burlap sack didn’t do what you were hoping it would. Instead, the child’s thick toes rupture your scrotum and you collapse in confusion and guttural pain. You bleed out and create a crimson puddle carrying your testes. As you fade off to oblivion you see him wiping his feet on your soon to be a corpse. The cloth isn’t armor, I feel as if I shouldn’t be telling you this.`,
                requiredState: (currentState) => currentState.testeArmorDeath,
                nextText: -1
            },
            {
                text: `You attempt to eat the cheese to receive a blessing from a being you made up in a panic frenzy. The mold on the cheese makes it hard to swallow as you have naturally weak salivary glands, but you still decide to shove in several blocks at a time. The child stops his kick and decides to pinch your nose instead. You choke and collapse in his arms as you turn blue, he calls you his sweet little blueberry.`,
                requiredState: (currentState) => currentState.ratGodDeath,
                nextText: -1
            },
            {
                text: `You start flailing your malnourished limbs in several sexual seductive poses. The child becomes flustered and very confused and what we don’t understand we fear. He tackles you and starts blubbering as he pounds your skull into the floor. Before you drift into oblivion, you feel something poking your sternum.`,
                requiredState: (currentState) => currentState.confusedSexualFrustration,
                nextText: -1
            },
            {
                text: `As they say, the most evasive manuever is the one not taken. Bound to make the aggressor question their actions, possibly leading to a blunder, perhaps even crumble to their knees in the presence of true stoicism? Well, now you have all the time in the world to ponder these possibilities as you feel your hipbone become displaced within your torso. To take away your ability to even soil yourself in death, the cruelty of this adolescent swine knows no bounds.`,
                requiredState: (currentState) => currentState.anIdiotsDeath,
                nextText: -1
            },
        ]
    },
    {
        id: 5,
        text: ``,
        options: []
    },
    {
        id: 6,
        text: ``,
        options: []
    },
    {
        id: 7,
        text: ``,
        options: []
    },
    
];

startGame();







 







































