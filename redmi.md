json
{
  "name": "backend-techhub-gadgets",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.123.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "firebase-admin": "^14.2.0",
    "mongodb": "^7.5.0",
    "react-helmet-async": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}



AI Model যা যা করবে (এখন পর্যন্ত implement করা)
Model: claude-sonnet-5

Backend-এর services/claude.js-এ centralized করা, তিনটা ফিচারই এই একই ফাংশন (askClaude) ব্যবহার করে।

১. SEO Generate

কোথায়: Add/Edit Product ফর্মে "Generate SEO" বাটন
Input যা পাঠায়: Product name, brand, type, price, shortDescription
Output যা পায়:

SEO Title (৬০ ক্যারেক্টারের মধ্যে)
Meta Description (১৫৫ ক্যারেক্টারের মধ্যে)
৫টা Keyword
সেভ হয়: MongoDB-তে seoTitle, metaDescription, keywords field হিসেবে
২. Product Description Generate

কোথায়: "Write with AI" বাটন, Short Description-এর পাশে
Input: Product name, brand, type, specs (RAM/storage ইত্যাদি)
Output: Short description (এক লাইন) + Full description (২-৩ প্যারাগ্রাফ)
সেভ হয়: shortDescription, fullDescription field-এ

৩. Alt Text Generate

কোথায়: "Suggest with AI" বাটন, Product Image-এর পাশে
Input: Product name, brand, type
Output: ছবির জন্য accessibility-friendly alt text
সেভ হয়: altText field-এ

নিরাপত্তা যা বসানো আছে
তিনটা route-ই verifyAdmin middleware দিয়ে protected — শুধু logged-in admin ব্যবহার করতে পারবে
Frontend-এ Name+Brand খালি থাকলে বাটন কাজ করবে না (validation)
Toast notification দিয়ে success/error দেখানো হয়

--------------------*** AI ***---------------------------------


AI SEO ফিচার — সম্পূর্ণ চিত্র
সমস্যাটা কী ছিল, শুরুতে

আপনার TechHub-এ যখন কেউ Google-এ "iPhone 16 Pro price specs" লিখে সার্চ করে, Google প্রথমে দেখে আপনার পেজের শিরোনাম আর সংক্ষিপ্ত বিবরণ (search result-এ যে নীল লিংক আর তার নিচের ধূসর লাইন দেখা যায়)। এটাই ছিল না — আপনার সব পেজের টাইটেল একই রকম, কোনো পেজ-নির্দিষ্ট বর্ণনা ছিল না। ফলে Google বুঝতেই পারতো না কোন পেজে কী আছে, এবং সার্চ result-এও আকর্ষণীয়ভাবে দেখাতে পারতো না।

AI এখানে কী করছে — তিনটা কাজ, একটা মূল লক্ষ্যে

১. প্রতিটা প্রোডাক্টের জন্য নিজস্ব "পরিচয়পত্র" তৈরি করা (SEO)

Admin যখন একটা প্রোডাক্ট (যেমন "iPhone 16 Pro") যোগ করেন, "Generate SEO" বাটনে ক্লিক করলে Claude সেই প্রোডাক্টের নাম, ব্র্যান্ড, দাম দেখে বানিয়ে দেয়:

একটা সংক্ষিপ্ত, আকর্ষণীয় শিরোনাম (যেটা Google search result-এ নীল লিংক হিসেবে দেখাবে)
একটা ছোট বর্ণনা (যেটা সেই লিংকের নিচে ধূসর টেক্সট হিসেবে দেখাবে, মানুষকে ক্লিক করতে আগ্রহী করবে)
কিছু কীওয়ার্ড (যে শব্দগুলো দিয়ে মানুষ এই প্রোডাক্ট খুঁজতে পারে)

এটা ঠিক যেন একজন কপিরাইটার প্রতিটা প্রোডাক্টের জন্য আলাদা করে একটা "বিজ্ঞাপনী লাইন" লিখে দিচ্ছে — শুধু আপনাকে হাতে লিখতে হচ্ছে না, Claude করে দিচ্ছে সেকেন্ডে।

২. প্রোডাক্টের বর্ণনা লিখে দেওয়া

আগে প্রতিটা প্রোডাক্টের "Short Description" আর "Full Description" আপনাকে নিজে টাইপ করতে হতো — অনেক সময় এটা ফাঁকা থেকে যেত বা "বিস্তারিত পরে লিখবো" জাতীয় placeholder থেকে যেত। এখন শুধু নাম আর কিছু spec (RAM, display) দিলে, Claude সেটা দিয়ে একটা সুন্দর, স্বাভাবিক ভাষায় বর্ণনা লিখে দেয় — বানিয়ে বলে না, যা তথ্য দিয়েছেন তার ভিত্তিতেই লেখে।

৩. ছবির জন্য "বর্ণনা" তৈরি করা (Alt Text)

প্রতিটা ছবির একটা "alt text" থাকে — এটা এমন একটা টেক্সট যেটা ছবিটা load না হলে বা কেউ screen-reader (দৃষ্টি প্রতিবন্ধী ব্যবহারকারীদের জন্য) ব্যবহার করলে দেখানো/শোনানো হয়। এটা দুটো কাজে লাগে — accessibility (সবার জন্য ব্যবহারযোগ্য সাইট) আর SEO (Google Image Search-এও আপনার সাইট দেখাতে পারে)।

এই তিনটা তথ্য যায় কোথায়

----------
Admin বাটনে ক্লিক করে
      ↓
Claude তথ্য তৈরি করে
      ↓
MongoDB-তে সেই প্রোডাক্টের সাথেই সেভ হয় (seoTitle, metaDescription, keywords, altText)
      ↓
যখন কেউ সেই প্রোডাক্টের পেজ visit করে
      ↓
React-Helmet-Async (যেটা এইমাত্র বসালেন) এই তথ্য নিয়ে
ব্রাউজারের ট্যাব টাইটেল আর <head> এর ভেতরের মেটাডেটা বদলে দেয়

----------
এটা বাস্তবে কী পরিবর্তন আনবে
Browser ট্যাবে এখন "TechHub" এর বদলে "Apple's Latest Titanium Smartphone - TechHub" জাতীয় নির্দিষ্ট টাইটেল দেখাবে
সোশ্যাল মিডিয়ায় লিংক শেয়ার করলে (Facebook, WhatsApp) একটা সুন্দর প্রিভিউ কার্ড দেখাবে (ছবি + শিরোনাম + বর্ণনা সহ) — এটাই Open Graph tag-এর কাজ
Google search result-এ (সময়ের সাথে, index হওয়ার পর) প্রতিটা প্রোডাক্ট পেজ নিজস্ব শিরোনাম-বর্ণনা নিয়ে দেখাবে, একই রকম না
যেটা এখনো সীমাবদ্ধতা, honestly

এটা content তৈরি করে এবং ব্রাউজারে দেখায়, কিন্তু Google-এর crawler এই React-based সাইটে এই content কতটা দ্রুত/নির্ভুলভাবে "পড়তে" পারবে সেটা এখনো পুরোপুরি নিশ্চিত না (আগে যে SPA rendering সীমাবদ্ধতার কথা বলেছিলাম, সেটা আংশিক উন্নত হয়েছে, সম্পূর্ণ সমাধান হয়নি)। তবে এটা এখন যেকোনো মানুষ সরাসরি visit করলে, বা browser/social media এর মতো JavaScript-চালিত crawler-এর জন্য কাজ করবে।

সংক্ষেপে — এটা মূলত একটা স্বয়ংক্রিয় কপিরাইটার, যেটা প্রতিটা প্রোডাক্টের জন্য আলাদা করে সার্চ-বান্ধব শিরোনাম, বর্ণনা, আর ছবির caption লিখে দেয় — যা আগে আপনাকে একটা একটা করে হাতে লিখতে হতো।