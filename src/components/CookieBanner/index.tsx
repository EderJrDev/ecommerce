import React, { useState, useEffect } from "react";

const CookieBanner: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleAcceptCookies = (): void => {
    setIsAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  useEffect(() => {
    if (localStorage.getItem("cookiesAccepted") === "true") {
      setIsAccepted(true);
    }
  }, []);

  if (isAccepted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 text-black p-4 flex items-center justify-between shadow-md">
      <div>
        <h3 className="text-lg font-semibold">Aviso de cookies</h3>
        <p>Utilizamos cookies para oferecer melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo.</p>
      </div>
      <button
        onClick={handleAcceptCookies}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
      >
        Aceitar todos os cookies
      </button>
    </div>
  );
};

export default CookieBanner;
