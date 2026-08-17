import { useState, useEffect } from "react";
import { db } from "../lib/firebaseClient";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%' y='50%' fill='%2364748b' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16'>No Image Available</text></svg>";

  const formatImageUrl = (url) => {
    if (!url || typeof url !== "string") return fallbackImage;
    const cleanRawUrl = url.trim().replace(/^["']|["']$/g, "");

    if (!cleanRawUrl) return fallbackImage;

    if (
      cleanRawUrl.startsWith("http://") ||
      cleanRawUrl.startsWith("https://") ||
      cleanRawUrl.startsWith("data:") ||
      cleanRawUrl.startsWith("blob:")
    ) {
      return cleanRawUrl;
    }

    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    const cleanUrl = cleanRawUrl.startsWith("/")
      ? cleanRawUrl.slice(1)
      : cleanRawUrl;

    return `${baseUrl}${cleanUrl}`;
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const items = snapshot.docs.map((doc) => {
          const data = doc.data();

          let imageUrl = "";
          let formattedDescription = "";

          if (data.content) {
            const parser = new DOMParser();
            const parsedDoc = parser.parseFromString(data.content, "text/html");

            const imgTag = parsedDoc.querySelector("img");
            if (imgTag) {
              imageUrl = imgTag.getAttribute("src") || "";
            }

            let htmlStr = data.content;
            htmlStr = htmlStr.replace(/<\/(p|div|h1|h2|h3|h4|h5|h6)>/gi, "\n");
            htmlStr = htmlStr.replace(/<br\s*[\/]?>/gi, "\n");

            const tempDoc = parser.parseFromString(htmlStr, "text/html");
            formattedDescription = tempDoc.body.textContent || "";
          }

          const rawImg = data.imageUrl || imageUrl;

          return {
            id: doc.id,
            title: data.title || "No Title",
            description: formattedDescription.trim(),
            image: formatImageUrl(rawImg),
            rawImgPath: rawImg,
          };
        });

        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1329] text-white flex items-center justify-center">
        <p className="text-lg animate-pulse font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1329] text-white py-10 px-6">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-white tracking-tight">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-[#151f38] border border-gray-800 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-blue-500 transition-all overflow-hidden h-full"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden bg-white p-2 flex items-center justify-center mb-4 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  if (
                    item.rawImgPath &&
                    !item.rawImgPath.startsWith("http") &&
                    e.target.src !== fallbackImage
                  ) {
                    const altSrc = item.rawImgPath.startsWith("/")
                      ? item.rawImgPath
                      : `/${item.rawImgPath}`;
                    if (e.target.src !== window.location.origin + altSrc) {
                      e.target.src = altSrc;
                      return;
                    }
                  }
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </div>

            <div className="flex flex-col flex-1 justify-between text-center overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase truncate">
                  {item.title}
                </h3>
              </div>

              <div className="text-blue-400 font-semibold text-xs leading-relaxed whitespace-pre-line text-left bg-[#0b1329]/60 p-3 rounded-lg border border-slate-700/50 mt-2 overflow-hidden break-words">
                {item.description || "No description available"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
