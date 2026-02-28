// plugins/fun.js
import axios from "axios";
import { Module } from "../lib/plugins.js";

// ─────────────────────────────────────────────
//  🎯 TRUTH OR DARE DATA
// ─────────────────────────────────────────────
const TRUTHS = [
  "What's the most embarrassing thing you've ever done?",
  "Have you ever lied to your best friend? What was it about?",
  "What's your biggest secret that nobody knows?",
  "Have you ever cheated on a test or exam?",
  "What's the most childish thing you still do?",
  "Have you ever pretended to be sick to avoid something?",
  "What's the worst thing you've ever said about someone behind their back?",
  "Have you ever stolen something? What was it?",
  "What's your biggest fear that you've never told anyone?",
  "Have you ever had a crush on a friend's partner?",
  "What's the most embarrassing photo on your phone?",
  "Have you ever ghosted someone? Why?",
  "What's the biggest lie you've told your parents?",
  "Have you ever faked laughing at a joke you didn't understand?",
  "What's the most embarrassing thing you've searched online?",
  "Have you ever forgotten someone's name in the middle of a conversation?",
  "What's a bad habit you have that you hope no one notices?",
  "Have you ever fallen asleep during an important event?",
  "What's the most ridiculous thing you've done to impress someone?",
  "Have you ever walked into the wrong bathroom by mistake?",
];

const DARES = [
  "Send a voice message singing your favorite song right now!",
  "Change your profile picture to the first photo in your gallery for 1 hour.",
  "Write 'I love pickles' as your WhatsApp status for 30 minutes.",
  "Send a funny selfie right now.",
  "Text 'I miss you' to the last person you talked to.",
  "Do 20 push-ups and send a voice message counting out loud.",
  "Send a voice message speaking in an accent for 1 minute.",
  "Call someone in this group and sing happy birthday to them.",
  "Send a voice message confessing your most embarrassing moment.",
  "Post a meme about yourself as your status for 1 hour.",
  "Send a text message saying 'oink oink' to 3 contacts.",
  "Do your best impression of a famous person via voice message.",
  "Speak only in questions for the next 5 minutes in this chat.",
  "Send a voice message telling a joke (it must be funny!).",
  "Change your name in this group chat to 'Potato' for 10 minutes.",
  "Send a photo of the weirdest thing in your room.",
  "Do a 30-second dance and send the video.",
  "Send a voice message pretending you're a news reporter.",
  "Write a love poem for your phone and send it here.",
  "Send a voice message saying the alphabet backwards.",
];

const EIGHT_BALL_RESPONSES = [
  // Positive
  "✅ It is certain.",
  "✅ It is decidedly so.",
  "✅ Without a doubt.",
  "✅ Yes, definitely!",
  "✅ You may rely on it.",
  "✅ As I see it, yes.",
  "✅ Most likely.",
  "✅ Outlook good.",
  "✅ Yes!",
  "✅ Signs point to yes.",
  // Neutral
  "🤔 Reply hazy, try again.",
  "🤔 Ask again later.",
  "🤔 Better not tell you now.",
  "🤔 Cannot predict now.",
  "🤔 Concentrate and ask again.",
  // Negative
  "❌ Don't count on it.",
  "❌ My reply is no.",
  "❌ My sources say no.",
  "❌ Outlook not so good.",
  "❌ Very doubtful.",
];

const ROASTS = [
  "You're not stupid, you just have bad luck thinking.",
  "I'd roast you, but my mom said I'm not allowed to burn trash.",
  "You're the reason they put instructions on shampoo bottles.",
  "You have your entire life to be an idiot. Why waste today?",
  "I'd explain it to you, but I don't have the crayons for that.",
  "If laughter is the best medicine, your face must be curing the world.",
  "You're like a software update — whenever I see you, I think 'not now'.",
  "Don't worry about what people think. Most people don't think at all.",
  "You're proof that even God makes mistakes sometimes.",
  "You're so slow, it takes you an hour to watch 60 Minutes.",
  "If brains were gasoline, you wouldn't have enough to power an ant's motorcycle.",
  "You're like a cloud — when you disappear, it's a beautiful day.",
  "Somewhere out there, a tree is tirelessly producing oxygen for you. Go apologize to it.",
  "I thought I had the flu, but then I realized your personality is just contagious.",
  "You bring so much joy into the room... when you leave it.",
  "You're the human version of a participation trophy.",
  "I'm not saying you're dumb, but you'd struggle to pour water out of a boot with instructions on the heel.",
  "You're like a broken pencil — completely pointless.",
  "I've seen smarter decisions made by people who put their shoes on the wrong feet.",
  "You're not ugly, but you could donate your face to science.",
];

const WYR_QUESTIONS = [
  "Would you rather have the ability to fly ✈️ OR be invisible 👁️?",
  "Would you rather lose all your money 💸 OR lose all your memories 🧠?",
  "Would you rather be always cold 🥶 OR always hot 🥵?",
  "Would you rather only be able to whisper 🤫 OR only be able to shout 📢?",
  "Would you rather have fingers as long as your legs 🦵 OR legs as short as your fingers 🤏?",
  "Would you rather know when you'll die 💀 OR how you'll die ☠️?",
  "Would you rather eat only sweet food 🍭 OR only salty food 🧂 forever?",
  "Would you rather have no internet 📵 OR no phone 📱 for a year?",
  "Would you rather be able to talk to animals 🐾 OR speak every human language 🌍?",
  "Would you rather be famous but hated 😈 OR unknown but loved 💖?",
  "Would you rather time travel to the past ⏮️ OR the future ⏭️?",
  "Would you rather never use social media again 📵 OR never watch TV/movies again 📺?",
  "Would you rather always have to sing instead of talking 🎵 OR dance whenever you hear music 💃?",
  "Would you rather be able to read minds 🧠 OR predict the future 🔮?",
  "Would you rather never feel pain 💪 OR never feel sad 😊?",
  "Would you rather live without music 🎵 OR live without colors 🌈?",
  "Would you rather fight 1 horse-sized duck 🦆 OR 100 duck-sized horses 🐴?",
  "Would you rather have unlimited money 💰 but no friends 😢 OR be broke but have amazing friends 🤝?",
  "Would you rather always be 10 minutes late ⏰ OR always be 2 hours early 🕐?",
  "Would you rather be able to teleport 🌀 OR be able to stop time ⏸️?",
];

// ─────────────────────────────────────────────
//  🎯 TRUTH
// ─────────────────────────────────────────────
Module({
  command: "truth",
  package: "fun",
  description: "Get a random truth question",
})(async (message) => {
  try {
    await message.react("🎯");
    const question = TRUTHS[Math.floor(Math.random() * TRUTHS.length)];

    await message.send(
      `🎯 *TRUTH*\n\n❓ ${question}\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
    );
  } catch (err) {
    console.error("[TRUTH ERROR]", err);
    await message.react("❌");
    await message.send("❌ Failed to get truth question.");
  }
});

// ─────────────────────────────────────────────
//  💪 DARE
// ─────────────────────────────────────────────
Module({
  command: "dare",
  package: "fun",
  description: "Get a random dare challenge",
})(async (message) => {
  try {
    await message.react("💪");
    const dare = DARES[Math.floor(Math.random() * DARES.length)];

    await message.send(
      `💪 *DARE*\n\n🔥 ${dare}\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
    );
  } catch (err) {
    console.error("[DARE ERROR]", err);
    await message.react("❌");
    await message.send("❌ Failed to get dare challenge.");
  }
});

// ─────────────────────────────────────────────
//  🎱 8BALL
// ─────────────────────────────────────────────
Module({
  command: ["8ball", "magic"],
  package: "fun",
  description: "Ask the magic 8 ball a question",
})(async (message, match) => {
  try {
    if (!match) {
      return await message.send(
        `🎱 *MAGIC 8 BALL*\n\nAsk me a yes/no question!\nExample: *.8ball Will I be rich?*`
      );
    }

    await message.react("🎱");
    const response =
      EIGHT_BALL_RESPONSES[
        Math.floor(Math.random() * EIGHT_BALL_RESPONSES.length)
      ];

    await message.send(
      `🎱 *MAGIC 8 BALL*\n\n❓ *Question:* ${match.trim()}\n\n🔮 *Answer:* ${response}\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
    );
  } catch (err) {
    console.error("[8BALL ERROR]", err);
    await message.react("❌");
    await message.send("❌ The magic ball is cloudy right now.");
  }
});

// ─────────────────────────────────────────────
//  🔥 ROAST
// ─────────────────────────────────────────────
Module({
  command: "roast",
  package: "fun",
  description: "Get a random funny roast",
})(async (message, match) => {
  try {
    await message.react("🔥");
    const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];

    const target = match ? `@${match.replace(/[^0-9]/g, "")}` : null;
    const text = target
      ? `🔥 *ROAST*\n\n${target} — ${roast}\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
      : `🔥 *ROAST*\n\n${roast}\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`;

    await message.send(text);
  } catch (err) {
    console.error("[ROAST ERROR]", err);
    await message.react("❌");
    await message.send("❌ Failed to get roast.");
  }
});

// ─────────────────────────────────────────────
//  💘 SHIP
// ─────────────────────────────────────────────
Module({
  command: ["ship", "love", "compatibility"],
  package: "fun",
  description: "Calculate compatibility between 2 names\nExample: .ship John & Jane",
})(async (message, match) => {
  try {
    if (!match || !match.includes("&")) {
      return await message.send(
        `💘 *SHIP*\n\nCalculate love compatibility!\nExample: *.ship John & Jane*`
      );
    }

    await message.react("💘");

    const [name1, name2] = match.split("&").map((n) => n.trim());
    if (!name1 || !name2) {
      return await message.send("❌ Please provide two names separated by &");
    }

    // Deterministic score based on names (same names = same score)
    const combined = (name1 + name2).toLowerCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash * 31 + combined.charCodeAt(i)) % 100;
    }
    const score = (hash + 42) % 101; // 0-100

    // Compatibility message
    let emoji, status;
    if (score >= 90) { emoji = "💯"; status = "SOULMATES! Perfect match! 🥰"; }
    else if (score >= 75) { emoji = "💖"; status = "Amazing chemistry! You two are great together! 😍"; }
    else if (score >= 60) { emoji = "💕"; status = "Good compatibility! There's definitely something there! 😊"; }
    else if (score >= 45) { emoji = "💛"; status = "Average match. Could work with effort! 🤔"; }
    else if (score >= 30) { emoji = "🤍"; status = "Not the best match, but love can surprise you! 🙃"; }
    else { emoji = "💔"; status = "Low compatibility... but miracles happen! 😅"; }

    // Progress bar
    const filled = Math.round(score / 10);
    const bar = "█".repeat(filled) + "░".repeat(10 - filled);

    await message.send(
      `💘 *SHIP*\n\n` +
      `👤 *${name1}*\n` +
      `💞 + \n` +
      `👤 *${name2}*\n\n` +
      `${emoji} *Compatibility:* ${score}%\n` +
      `[${bar}]\n\n` +
      `💬 *${status}*\n\n` +
      `> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
    );
  } catch (err) {
    console.error("[SHIP ERROR]", err);
    await message.react("❌");
    await message.send("❌ Failed to calculate compatibility.");
  }
});

// ─────────────────────────────────────────────
//  🤔 WOULD YOU RATHER
// ─────────────────────────────────────────────
Module({
  command: ["wyr", "wouldyourather"],
  package: "fun",
  description: "Get a random 'Would You Rather' question",
})(async (message) => {
  try {
    await message.react("🤔");
    const question = WYR_QUESTIONS[Math.floor(Math.random() * WYR_QUESTIONS.length)];

    await message.send(
      `🤔 *WOULD YOU RATHER?*\n\n${question}\n\n💬 Reply with your choice!\n\n> © Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ`
    );
  } catch (err) {
    console.error("[WYR ERROR]", err);
    await message.react("❌");
    await message.send("❌ Failed to get question.");
  }
});
