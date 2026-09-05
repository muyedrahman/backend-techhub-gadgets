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