
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart } from "@/components/Charts";
import { MetricCard } from "@/components/MetricCard";
import { ReviewCard } from "@/components/ReviewCard";
import { DashboardNav } from "@/components/DashboardNav";
import { useToast } from "@/components/ui/use-toast";
import { User, ArrowUp, ArrowDown, Star, Minus } from "lucide-react";

type Review = {
  comentario: string;
  sentimiento: string;
  servicio: string;
  pais: string;
  fecha: string;
  valoracion: number;
  id: number;
  nombreUsuario: string;
};

type ReviewsData = {
  [key: string]: {
    reviews: Review[];
    resumen: string;
    palab_freq: string[];
  };
};


const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "Tab Changed",
      description: `You've switched to the ${value} tab`,
    });
  };

  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [positiveCount, setPositiveCount] = useState<number>(0);
  const [positivePercent, setPositivePercent] = useState<number>(0);
  const [neutralCount, setNeutralCount] = useState<number>(0);
  const [neutralPercent, setNeutralPercent] = useState<number>(0);
  const [negativeCount, setNegativeCount] = useState<number>(0);
  const [negativePercent, setNegativePercent] = useState<number>(0);
  const [allCount, setAllCount] = useState<number>(0);

  useEffect(() => {
    fetch("/example.json")
      .then((response) => response.json())
      .then((data: ReviewsData) => setReviewsData(data))
      .catch((error) => console.error("Error cargando el JSON:", error));
  }, []);

  useEffect(() => {
    if (reviewsData) {
      const positiveReviews = reviewsData['positivo']?.reviews || [];
      const neutralReviews = reviewsData['neutral']?.reviews || [];
      const negativeReviews = reviewsData['negativo']?.reviews || [];

      // Cálculo de los nuevos valores
      const newPositiveCount = positiveReviews.length;
      const newNeutralCount = neutralReviews.length;
      const newNegativeCount = negativeReviews.length;
      const newAllCount = newPositiveCount + newNeutralCount + newNegativeCount;

      // Actualización de los contadores
      setPositiveCount(newPositiveCount);
      setNeutralCount(newNeutralCount);
      setNegativeCount(newNegativeCount);
      setAllCount(newAllCount);

      // Cálculo de los porcentajes
      setPositivePercent((newPositiveCount / newAllCount) * 100);
      setNeutralPercent((newNeutralCount / newAllCount) * 100);
      setNegativePercent((newNegativeCount / newAllCount) * 100);
    }
  }, [reviewsData]);

  if (!reviewsData) {
    return <p>Cargando opiniones...</p>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <DashboardNav />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight color-brand">Análisis de opiniones</h1>
            </div>
          </div>

          <Card>
            <CardContent className="p-6" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div className="flex items-center justify-between space-x-2" style={{ flexDirection: "column" }}>
                <div>
                  <span >{"Total de Opiniones"}</span>
                </div>
                <span
                  className="text-xs font-medium text-green-500" style={{ marginLeft: "-90px" }}
                >
                  {"+12.5%"}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold">{allCount}</span>
              </div>
            </CardContent>
          </Card>
          {/* Metric Cards Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Positivas"
              value={positivePercent.toFixed(2).toString() + "%"}
              change="+0.24%"
              trend="up"
              icon={<ArrowUp className="w-4 h-4" />}
            />
            <MetricCard
              title="Neutras"
              value={neutralPercent.toFixed(2).toString() + "%"}
              change="-0.4%"
              trend="down"
              icon={<Minus className="w-4 h-4" />}
            />
            <MetricCard
              title="Negativas"
              value={negativePercent.toFixed(2).toString() + "%"}
              change="-1.2%"
              trend="up"
              icon={<ArrowDown className="w-4 h-4" />}
            />
          </div>

          {/* Tabs for Different Charts */}
          <Tabs defaultValue="overview" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8 w-full" style={{ display: "flex", justifyContent: "space-between" }}>
              <TabsTrigger value="overview" style={{ flexGrow: "1" }}>General</TabsTrigger>
              <TabsTrigger value="performance" style={{ flexGrow: "1" }}>Resumen</TabsTrigger>
              <TabsTrigger value="engagement" style={{ flexGrow: "1" }}>Servicios</TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Sentimiento general</CardTitle>
                    <CardDescription>Métricas por usuario</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <BarChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Opiniones</CardTitle>
                    <CardDescription>Últimas destacadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ReviewCard
                        name="Evelyn T. Azevedo H."
                        rating={5}
                        date="Hace 1 hora"
                        review="Muy buen servicio, la calidad muy buena y precio muy asequible."
                      />
                      <ReviewCard
                        name="Mike"
                        rating={4}
                        date="Hace 2 días"
                        review="Great experience overall. There were a few minor issues, but the customer service is excellent."
                      />
                      <ReviewCard
                        name="Laura Milanesi"
                        rating={5}
                        date="Hace 5 días"
                        review="He abierto un siniestro en el extranjero en Italia, en Milan en noviembre, me puse en contacto con una agencia en Roma, después de la pericia bastante rápida y establecido el reembolso, el 14 de enero me pidieron los datos bancarios desde Axa España y desde entonces no me contestan."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab Content */}
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "18px", textTransform: "uppercase", "fontWeight": "bold" }}>Positivo</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "#0000F8" }}>{positiveCount}</p>
                    </div>
                  </div>
                  <div className="my-3" style={{ width: "100%" }}>
                    {reviewsData?.positivo && (
                      <div style={{ marginBottom: "20px" }}>
                        <Card><CardContent className="p-4"><div style={{ display: "flex", flexDirection: "column" }}><strong>Resumen</strong> {reviewsData.positivo.resumen}</div></CardContent></Card>
                        <Card className="my-3">
                          <CardContent className="p-4">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <strong>Palabras Frecuentes</strong>
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                {reviewsData.positivo.palab_freq.map((palabra) => (
                                  <span style={{ border: "solid 1px #f1f5f9", backgroundColor: "#f1f5f9", padding: "0.5%", margin: "0.5%", borderRadius: "4px", textTransform: "capitalize" }}>{palabra}</span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "18px", textTransform: "uppercase", "fontWeight": "bold" }}>Neutral</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "#0000F8" }}>{neutralCount}</p>
                    </div>
                  </div>
                  <div className="my-3" style={{ width: "100%" }}>
                    {reviewsData?.neutral && (
                      <div style={{ marginBottom: "20px" }}>
                        <Card><CardContent className="p-4"><div style={{ display: "flex", flexDirection: "column" }}><strong>Resumen</strong> {reviewsData.neutral.resumen}</div></CardContent></Card>
                        <Card className="my-3">
                          <CardContent className="p-4">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <strong>Palabras Frecuentes</strong>
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                {reviewsData.neutral.palab_freq.map((palabra) => (
                                  <span style={{ border: "solid 1px #f1f5f9", backgroundColor: "#f1f5f9", padding: "0.5%", margin: "0.5%", borderRadius: "4px", textTransform: "capitalize" }}>{palabra}</span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "18px", textTransform: "uppercase", "fontWeight": "bold" }}>Negativo</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "#0000F8" }}>{negativeCount}</p>
                    </div>
                  </div>
                  <div className="my-3" style={{ width: "100%" }}>
                    {reviewsData?.negativo && (
                      <div style={{ marginBottom: "20px" }}>
                        <Card><CardContent className="p-4"><div style={{ display: "flex", flexDirection: "column" }}><strong>Resumen</strong> {reviewsData.negativo.resumen}</div></CardContent></Card>
                        <Card className="my-3">
                          <CardContent className="p-4">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <strong>Palabras Frecuentes</strong>
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                {reviewsData.negativo.palab_freq.map((palabra) => (
                                  <span style={{ border: "solid 1px #f1f5f9", backgroundColor: "#f1f5f9", padding: "0.5%", margin: "0.5%", borderRadius: "4px", textTransform: "capitalize" }}>{palabra}</span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Engagement Tab Content */}
            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p>Seguro del Hogar</p>
                      <p style={{ fontSize: "15px", color: "green" }}>Satisfacción: +12.8%</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "green" }}>3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p>Seguro de Coche</p>
                      <p style={{ fontSize: "15px", color: "red" }}>Satisfacción: -3.8%</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "green" }}>3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                      <p>Seguro de Vida</p>
                      <p style={{ fontSize: "15px", color: "green" }}>Satisfacción: +1.3%</p>
                    </div>
                    <div className="mt-1">
                      <p>Total de opiniones</p>
                      <p style={{ fontSize: "15px", color: "green" }}>3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
