import React, { useState, useEffect } from "react";
import imageMac1 from './assets/mac1.webp';
import imageMac2 from './assets/mac2.webp';
import imageMac3 from './assets/mac3.webp';
import imageMac4 from './assets/mac4.webp';
import imageMacSilver1 from './assets/mac-silver-1.webp';
import imageMacSilver2 from './assets/mac-silver-2.webp';
import imageMacSilver3 from './assets/mac-silver-3.webp';
import imageMacSsilver4 from './assets/mac-silver-4.webp';
import CookieBanner from "./components/CookieBanner";
import Header from "./components/Header";
import Notification from "./components/Notification";

interface AddressProps {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  estado: string;
  regiao: string;
  unidade: string;
  erro?: boolean;
}

interface FreightProps {
  name: string;
  price: string;
  time: string;
}

const App = () => {
  const [mainImage, setMainImage] = useState(imageMac1);
  const [product] = useState({
    title: "MacBook Air M2 (2022) 13.6 midnight 8GB de Ram - 256GB SSD - Apple M",
    price: "R$ 6.912,00",
    variations: {
      sizes: ["Apple GPU", "Apple M2 10-Core GPU", "Apple M2 8-Core GPU"],
      colors: ["Midnight", "Silver"],
    },
  });

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Midnight");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<AddressProps | null>(null);
  const [freightInfo, setFreightInfo] = useState<FreightProps[] | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const checkCep = async (cep: string) => {
    if (cep.length !== 8) {
      setNotification({ message: "Informe exatos 8 caracteres.", type: "error" });
      return;
    }
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json() as AddressProps;
    if (data.erro) {
      setAddress(null);
      setNotification({ message: "CEP não encontrado.", type: "error" });
      return null;
    }
    setNotification({ message: "CEP consultado com sucesso!", type: "success" });
    return data;
  };

  const calculateFreight = async () => {
    if (!cep) {
      return;
    }
    const formattedCep = cep.replace(/\D/g, "");
    const responseCep = await checkCep(formattedCep) as AddressProps;
    setAddress(responseCep);
    if (responseCep) {
      setFreightInfo([
        { name: "J&T Express", price: "R$14,85", time: "Em até 10 dias úteis" },
        { name: "Correios PAC", price: "R$26,76", time: "Em até 15 dias úteis" },
        { name: "Correios Sedex", price: "R$35,64", time: "Em até 11 dias úteis" },
      ]);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (color === "Silver") {
      setMainImage(imageMacSilver1);
    } else {
      setMainImage(imageMac1);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("productData");
    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      if (parsedData) {
        setMainImage(parsedData.mainImage);
        setSelectedSize(parsedData.selectedSize);
        setSelectedColor(parsedData.selectedColor);
        setCep(parsedData.cep);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "productData",
      JSON.stringify({
        mainImage,
        selectedSize,
        selectedColor,
        cep,
      })
    );
    const timer = setTimeout(() => {
      localStorage.removeItem("productData");
    }, 900000);

    return () => clearTimeout(timer);
  }, [mainImage, selectedSize, selectedColor, cep]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="mx-auto">
      <Header />
      <CookieBanner />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="w-full min-h-[600px] max-h-[600px]">
            <img
              src={mainImage}
              alt="Produto"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto mt-4">
            {/* Exibe as miniaturas conforme a cor selecionada */}
            {selectedColor === "Silver" ? (
              [imageMacSilver1, imageMacSilver2, imageMacSilver3, imageMacSsilver4].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail Silver ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer rounded-md hover:border-2 hover:border-teal-500"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))
            ) : selectedColor === "Midnight" ? (
              [imageMac1, imageMac2, imageMac3, imageMac4].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail Midnight ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer rounded-md hover:border-2 hover:border-teal-500"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))
            ) : (
              [imageMac1, imageMac2, imageMac3, imageMac4].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail Space gray ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer rounded-md hover:border-2 hover:border-teal-500"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col w-full mt-6 md:mt-0 md:w-1/2">
          <div className="flex flex-col gap-4">
            <p>Início &gt; <span className="bg-black text-white p-1 rounded-md">Montink Tech</span> &gt; Mackbooks</p>
            <h2 className="text-2xl font-bold text-black">{product.title}</h2>
            <div>

              <p className="text-3xl font-extrabold text-black">{product.price}</p>
              <span className="text-gray-400">
                Ou <span className="font-bold"> 3x de R$ 1.908,00 </span> sem juros
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="size" className="block text-lg font-medium text-black">Tamanho:</label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              >
                {product.variations.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="color" className="block text-lg font-medium text-black">Cor:</label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              >
                {product.variations.colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="cep" className="block text-lg font-medium text-black">CEP para entrega:</label>
            <div className="flex">
              <input
                type="text"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite o CEP"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={calculateFreight}
                className="ml-4 bg-gray-600 text-white p-2 rounded-2xl w-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Calcular Frete
              </button>
            </div>
            <div>
              {address && (
                <div className="mt-2">
                  <p className="text-black">
                    <span className="font-bold">Entregar em: </span>
                    {address ? (
                      <>
                        {address.logradouro && `${address.logradouro}, `}
                        {address.bairro && `${address.bairro}, `}
                        {`${address.localidade} - ${address.uf}`}
                      </>
                    ) : (
                      <span>Endereço não encontrado</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {address && freightInfo && (
            <div className="mt-6">
              {freightInfo.map((freight: FreightProps, index: number) => (
                <div key={index} className="p-4 mb-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold">{freight.name}</h3>
                  <p className="text-sm">{freight.time}</p>
                  <p className="text-xl font-bold">{freight.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
