async function veriGetir() {
  const response = await fetch(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuL4uf1ISkCCSptQ_sTxiODW4ofr53Ky6sMjrl4gm1XAiFj1P8yKooh24wddpUx_5oW40ufFsIq8Nw/pub?output=csv",
  {
    cache: "no-store",
  }
  );

  const text = await response.text();

  return text;
}
const aylar = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
export default async function Home() {
  const data = await veriGetir();
  console.log(data);


const satirlar = data
  .trim()
  .split("\n")
  .map((satir) => satir.replace("\r", ""));

const basliklar = satirlar[0]
  .split(",")
  .map((item) => item.trim());

const gosterilecekAylar = basliklar.slice(1);

const daireler = satirlar
  .slice(1)
  .map((satir) => {
    const kolonlar = satir
      .split(",")
      .map((item) => item.trim());

    return {
      no: kolonlar[0],

      durumlar: kolonlar
        .slice(1)
        .map(
          (deger) =>
            deger === "TRUE"
        ),
    };
  });

  const toplamDaire = daireler.length;

  const buAyOdeyen = daireler.filter(
    (d) => d.durumlar[0]
  ).length;

  const buAyBekleyen =
    toplamDaire - buAyOdeyen;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">

        <div className="grid md:grid-cols-3 gap-4 mb-4">

          <div className="bg-white rounded-2xl shadow-md p-4">
            <h1 className="text-2xl font-bold">
              Öz Yıldırım Apartmanı
            </h1>

            <p className="text-gray-600 mt-2">
              Aidat Takip Sistemi
            </p>
          </div>

          <div className="bg-green-100 rounded-2xl shadow-md p-4">
            <p className="text-green-800 font-semibold">
              Bu Ay Ödeyen
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              {buAyOdeyen}
            </h2>
          </div>

          <div className="bg-red-100 rounded-2xl shadow-md p-4">
            <p className="text-red-800 font-semibold">
              Bekleyen
            </p>

            <h2 className="text-3xl font-bold text-red-700 mt-2">
              {buAyBekleyen}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b text-left">
                <th className="p-3">
                  Daire
                </th>

                {gosterilecekAylar.map((ay, index) => (
                  <th
                    key={index}
                    className="p-3 text-center"
                  >
                    {ay}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {daireler.map((daire, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-semibold">
                    Daire {daire.no}
                  </td>

                  {daire.durumlar.map((durum, i) => (
                    <td
                      key={i}
                      className="p-3 text-center"
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          durum
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {durum ? "Ödendi" : "Bekliyor"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </main>
  );
}