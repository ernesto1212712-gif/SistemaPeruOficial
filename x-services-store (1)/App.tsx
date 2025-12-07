
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  Shield, 
  Zap, 
  Star, 
  Plus, 
  Trash2, 
  Upload, 
  Menu, 
  X, 
  CheckCircle2, 
  Phone,
  Send,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Save,
  ArrowLeft,
  Megaphone,
  Bell,
  Ticket,
  Lock,
  LogOut,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react';
import { Product, Reference, Category, CATEGORIES, Announcement, DiscountCode } from './types';
import { analyzeProductImage } from './services/geminiService';

// --- INITIAL DATA ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: '💸 CASH OUT - TRANSFERENCIAS',
    description: '¡TRANSFERENCIAS ENTRE CUENTAS AL INSTANTE! Retira donde sea y sal de misio en minutos.\n\nPAQUETES DISPONIBLES:\n💵 PAGA S/150 👉 RECIBE S/3,500\n💵 PAGA S/200 👉 RECIBE S/4,000\n💵 PAGA S/300 👉 RECIBE S/4,700\n💵 PAGA S/450 👉 RECIBE S/5,250\n\n💰 TIEMPO DE ENTREGA: 10 MINUTOS MÁXIMO.\nBancos válidos. Garantía total.',
    price: 'S/150 - S/450',
    category: 'METHODS',
    features: ['Transferencia 10 min', 'Bancos Locales', 'Seguro y Anónimo', 'Soporte Rápido'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '2',
    title: '🔓 HACKING GENERAL & REDES',
    description: 'Servicios de hacking profesional. Recuperación y acceso.\n- Clonar WhatsApp.\n- Hackear/Recuperar Facebook, Gmail, Hotmail, Twitter, Instagram, TikTok.\n- Hacking súper rápido y confidencial.',
    price: 'Consultar',
    category: 'CONFIGS',
    features: ['WhatsApp', 'Redes Sociales', 'Correos', 'Recuperación'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '3',
    title: '⚖️ SISTEMA GOBIERNO & RQ',
    description: 'Trámites directos en sistema policial y judicial.\n- SE BORRA RQ por cualquier delito en 15 minutos.\n- Limpieza de vehículos (Captura).\n- Denuncias directas al sistema.\n- SE PONE RQ a tus enemigos (S1D4 de regalo).\n- Denuncias Policiales.',
    price: 'Premium',
    category: 'PROXIES',
    features: ['Borrar RQ', 'Poner RQ', 'Limpieza Vehicular', '15 Minutos'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '4',
    title: '🧾 PAGOS DE SERVICIOS 50%',
    description: 'Paga la mitad de tus deudas.\n- Se hacen pagos al 50% de cualquier recibo (Luz, Agua, Teléfono).\n- Pagos de Universidades e Institutos.\n- Ahorra dinero hoy mismo.',
    price: '50% OFF',
    category: 'METHODS',
    features: ['Recibos', 'Universidades', 'Servicios', 'Ahorro Total'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '5',
    title: '🎓 TÍTULOS & NOTAS (MINEDU)',
    description: 'Soluciones académicas registradas en sistema.\n- Títulos Universitarios y de Institutos.\n- Certificados de estudios.\n- Cambio de notas.\n- Te subo al sistema MINEDU con notas directas (Secundaria completa).',
    price: 'Consultar',
    category: 'PROXIES',
    features: ['Registro MINEDU', 'Títulos', 'Certificados', 'Notas'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '6',
    title: '📉 LIMPIEZA INFOCORP & DEUDAS',
    description: 'Sal de la lista negra y reactiva tu vida financiera.\n- Se libera de INFOCORP.\n- Borrado de deudas bancarias.\n- Reportes financieros / Sentinel.\n- Te dejamos en VERDE para sacar préstamos en minutos.',
    price: 'Variable',
    category: 'METHODS',
    features: ['Infocorp Verde', 'Borrar Deudas', 'Sentinel', 'Préstamos'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '7',
    title: '🚗 BREVETES & LICENCIAS',
    description: 'Licencias de conducir legales y rápidas.\n- Físicas y Electrónicas (Auto, Moto Lineal, Mototaxi).\n- Se quita retención de licencias.\n- Elimina puntos del récord.\n- Cambio de datos de cualquier vehículo.',
    price: 'Consultar',
    category: 'PROXIES',
    features: ['Sin Examen', 'Físico/Virtual', 'Elimina Puntos', 'MTC'],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '8',
    title: '🛡️ SOAT & PAPELETAS',
    description: 'Soluciones de tránsito.\n- SOAT La Positiva para cualquier vehículo con descuento.\n- Se ponen papeletas.\n- Se quitan papeletas del sistema.',
    price: 'Económico',
    category: 'PROXIES',
    features: ['SOAT Barato', 'Borrar Papeletas', 'Poner Multas', 'Tránsito'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '9',
    title: '🍿 CINEPLANET & ENTRETENIMIENTO',
    description: 'Disfruta del cine a mitad de precio.\n- Doy entradas y combos Cineplanet con 50% de descuento.\n- Packs corporativos y personales.',
    price: '50% OFF',
    category: 'METHODS',
    features: ['Entradas', 'Combos', 'Cineplanet', 'Descuentos'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '10',
    title: '✈️ PASAJES AÉREOS & TERRESTRES',
    description: 'Viaja por todo el Perú barato.\n- Vuelos: Sky, Jetsmart, Latam.\n- Buses: Civa, Flores, Linea, Cruz del Sur, etc.\n- Todo al 50% de descuento.',
    price: '50% OFF',
    category: 'METHODS',
    features: ['Vuelos', 'Buses', 'Viajes', 'Turismo'],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '11',
    title: '👥 SEGUIDORES & REDES',
    description: 'Potencia tu imagen digital.\n- Seguidores para cualquier plataforma (IG, TikTok, FB).\n- Likes, Vistas y Comentarios.\n- Servicio estable y garantizado.',
    price: 'Consultar',
    category: 'TOOLS',
    features: ['Seguidores Reales', 'Todas las Redes', 'Likes', 'Vistas'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '12',
    title: '💳 TARJETAS & SALDOS (CC)',
    description: 'Proveedor directo de material.\n- CC Tarjetas con saldos.\n- Venta de datos.\n- Preguntar sin compromiso.',
    price: 'Variable',
    category: 'TOOLS',
    features: ['CCs Lives', 'Saldos Altos', 'Material Fresco'],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '13',
    title: '💵 BILLETES G5 PREMIUM',
    description: 'Venta de billetes G5 de alta calidad. Pasan pruebas básicas.\n- Denominaciones: 10, 20, 50, 100, 200.\n- Excelente textura y acabado. Envíos discretos.',
    price: 'Consultar',
    category: 'TOOLS',
    features: ['Calidad G5', 'Textura Real', 'Envíos Perú', 'Discreto'],
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '14',
    title: '⚡ OTROS SERVICIOS',
    description: 'Soluciones varias:\n- Quito verificación de 2 pasos.\n- Doxeo libre.\n- Usuarios para poner y quitar denuncias.\n- Sistemas del gobierno peruano.',
    price: 'Consultar',
    category: 'TOOLS',
    features: ['Bypassing', 'Doxeo', 'Denuncias', 'Sistemas'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  }
];

// Start with EMPTY references to ensure cleaner state after reset
const INITIAL_REFS: Reference[] = [];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    text: '🚨 ¡NUEVO MÉTODO CASH OUT DISPONIBLE! CUPOS LIMITADOS 🚨',
    active: true,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    id: '1',
    code: 'SYSTEM20',
    description: '20% DSCTO en Hacking',
    active: true
  }
];

type ViewState = 'HOME' | 'CATALOG' | 'REFERENCES';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [view, setView] = useState<ViewState>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Persistence State - Version 3 for clean references
  const STORAGE_KEY_PRODS = 'xs_store_v3_products';
  const STORAGE_KEY_REFS = 'xs_store_v3_references';
  const STORAGE_KEY_ANNOUNCE = 'xs_store_v3_announcements';
  const STORAGE_KEY_DISCOUNTS = 'xs_store_v3_discounts';

  const [products, setProducts] = useState<Product[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Edit/Create State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  
  // View State (See More)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Form State
  const [newProd, setNewProd] = useState<Partial<Product>>({ 
    title: '', price: '', description: '', category: 'CONFIGS', features: [] 
  });
  const [newRef, setNewRef] = useState<Partial<Reference>>({ 
    clientName: '', serviceName: '' 
  });
  const [newAnnounce, setNewAnnounce] = useState('');
  const [newDiscount, setNewDiscount] = useState<{code: string, desc: string}>({ code: '', desc: '' });
  const [featureInput, setFeatureInput] = useState('');

  const prodFileRef = useRef<HTMLInputElement>(null);
  const refFileRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  // --- SHORTCUT ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ALT + 5 to toggle Admin Login
      if (e.altKey && e.key === '5') {
        if (isAdmin) {
          if(window.confirm("¿Cerrar sesión de administrador?")) {
            setIsAdmin(false);
            setShowAdminPanel(false);
          }
        } else {
          setShowLoginModal(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // --- PERSISTENCE ---
  // Load on mount
  useEffect(() => {
    const savedProds = localStorage.getItem(STORAGE_KEY_PRODS);
    const savedRefs = localStorage.getItem(STORAGE_KEY_REFS);
    const savedAnnounce = localStorage.getItem(STORAGE_KEY_ANNOUNCE);
    const savedDiscounts = localStorage.getItem(STORAGE_KEY_DISCOUNTS);
    
    if (savedProds) {
      setProducts(JSON.parse(savedProds));
    } else {
      setProducts(INITIAL_PRODUCTS);
    }

    if (savedRefs) {
      setReferences(JSON.parse(savedRefs));
    } else {
      setReferences(INITIAL_REFS);
    }

    if (savedAnnounce) {
      setAnnouncements(JSON.parse(savedAnnounce));
    } else {
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
    }

    if (savedDiscounts) {
      setDiscountCodes(JSON.parse(savedDiscounts));
    } else {
      setDiscountCodes(INITIAL_DISCOUNTS);
    }

    setIsLoaded(true);
  }, []);

  // Save on change (only if loaded)
  useEffect(() => {
    if (isLoaded) localStorage.setItem(STORAGE_KEY_PRODS, JSON.stringify(products));
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem(STORAGE_KEY_REFS, JSON.stringify(references));
  }, [references, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem(STORAGE_KEY_ANNOUNCE, JSON.stringify(announcements));
  }, [announcements, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem(STORAGE_KEY_DISCOUNTS, JSON.stringify(discountCodes));
  }, [discountCodes, isLoaded]);


  // --- IMAGE HELPERS ---
  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.6)); 
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // --- ACTIONS ---

  const handleLogin = () => {
    if (loginPassword === 'mela1234') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginPassword('');
      setShowAdminPanel(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleProdImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsAnalyzing(true);
      try {
        const file = e.target.files[0];
        const compressedBase64 = await compressImage(file);
        setNewProd(prev => ({ ...prev, imageUrl: compressedBase64 }));

        // AI Analysis
        const aiData = await analyzeProductImage(compressedBase64);
        setNewProd(prev => ({
          ...prev,
          title: aiData.title || prev.title,
          description: aiData.description || prev.description,
          price: aiData.price || prev.price,
          category: aiData.category || prev.category,
          features: aiData.features || prev.features,
          imageUrl: compressedBase64
        }));
      } catch (err) {
        console.error("Error processing image", err);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleRefImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const compressedBase64 = await compressImage(e.target.files[0]);
      setNewRef({ ...newRef, imageUrl: compressedBase64 });
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setNewProd({
      ...newProd,
      features: [...(newProd.features || []), featureInput.trim()]
    });
    setFeatureInput('');
  };

  const saveProduct = () => {
    if (!newProd.title || !newProd.price) return alert("Título y Precio requeridos");

    if (editingId) {
      // Update existing
      setProducts(products.map(p => p.id === editingId ? { ...p, ...newProd } as Product : p));
      setEditingId(null);
    } else {
      // Create new
      const product: Product = {
        id: Date.now().toString(),
        title: newProd.title!,
        description: newProd.description || '',
        price: newProd.price!,
        category: newProd.category as Category || 'CONFIGS',
        features: newProd.features || [],
        imageUrl: newProd.imageUrl,
        buyLink: 'https://wa.me/51939544566'
      };
      setProducts([product, ...products]);
    }
    
    // Reset Form
    setNewProd({ title: '', price: '', description: '', category: 'CONFIGS', features: [], imageUrl: undefined });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProd({ ...product });
    setView('CATALOG');
    // Scroll to form
    setTimeout(() => formTopRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewProd({ title: '', price: '', description: '', category: 'CONFIGS', features: [], imageUrl: undefined });
  };

  const createReference = () => {
    if (!newRef.imageUrl) return alert("La imagen es obligatoria");
    const reference: Reference = {
      id: Date.now().toString(),
      clientName: newRef.clientName || 'Cliente',
      serviceName: newRef.serviceName || 'Servicio',
      date: new Date().toLocaleDateString(),
      imageUrl: newRef.imageUrl
    };
    setReferences([reference, ...references]);
    setNewRef({ clientName: '', serviceName: '', imageUrl: undefined });
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };
  
  const deleteReference = (id: string) => {
     if (window.confirm("¿Eliminar referencia de forma permanente?")) {
       setReferences(prevRefs => prevRefs.filter(r => r.id !== id));
     }
  };

  const addAnnouncement = () => {
    if(!newAnnounce.trim()) return;
    const ann: Announcement = {
      id: Date.now().toString(),
      text: newAnnounce,
      active: true,
      createdAt: new Date().toISOString()
    };
    setAnnouncements([ann, ...announcements]);
    setNewAnnounce('');
  };

  const deleteAnnouncement = (id: string) => {
    if(window.confirm("¿Borrar anuncio?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  }

  const addDiscount = () => {
    if(!newDiscount.code.trim()) return;
    const disc: DiscountCode = {
      id: Date.now().toString(),
      code: newDiscount.code,
      description: newDiscount.desc,
      active: true
    };
    setDiscountCodes([disc, ...discountCodes]);
    setNewDiscount({code: '', desc: ''});
  }

  const deleteDiscount = (id: string) => {
    setDiscountCodes(discountCodes.filter(d => d.id !== id));
  }

  const handleNav = (target: ViewState) => {
    setView(target);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExpandDescription = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-purple-500/30">
      
      {/* --- MODAL LOGIN ADMIN --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
             <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
             
             <div className="flex flex-col items-center mb-6">
                <div className="bg-purple-900/30 p-4 rounded-full mb-4 border border-purple-500/30">
                  <Lock size={32} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Acceso Administrador</h2>
                <p className="text-slate-400 text-sm">Ingrese credenciales de seguridad</p>
             </div>

             <input 
                type="password" 
                autoFocus
                placeholder="Contraseña" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-center tracking-widest text-lg mb-6 focus:border-purple-500 outline-none"
             />

             <button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors">
               INGRESAR AL SISTEMA
             </button>
          </div>
        </div>
      )}

      {/* --- FLOATING ADMIN PANEL TOGGLE & CONTENT --- */}
      {isAdmin && (
        <>
          <button 
            onClick={() => setShowAdminPanel(!showAdminPanel)} 
            className="fixed bottom-4 right-4 z-50 bg-slate-800 text-purple-400 p-3 rounded-full shadow-lg border border-purple-500/50 hover:bg-slate-700 hover:scale-105 transition-all flex items-center gap-2 pr-4 group" 
            title="Panel Admin"
          >
            <Settings size={20} className={showAdminPanel ? 'rotate-90 transition-transform' : ''} />
            <span className="font-bold text-xs">ADMIN PANEL</span>
          </button>

          {showAdminPanel && (
            <div className="fixed bottom-20 right-4 z-50 w-full max-w-sm bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                   <h3 className="font-bold text-white flex items-center gap-2"><Shield size={16} className="text-purple-500" /> Control Global</h3>
                   <button onClick={() => setIsAdmin(false)} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded hover:bg-red-900/50 border border-red-500/20">Cerrar Sesión</button>
                </div>

                {/* Quick Announcements */}
                <div className="mb-4 space-y-2">
                   <label className="text-xs font-bold text-yellow-400 flex items-center gap-1"><Megaphone size={12} /> Nuevo Anuncio</label>
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newAnnounce}
                        onChange={(e) => setNewAnnounce(e.target.value)}
                        placeholder="Texto del anuncio..."
                        className="flex-1 bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white"
                      />
                      <button onClick={addAnnouncement} className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold"><Plus size={14}/></button>
                   </div>
                   <div className="max-h-24 overflow-y-auto space-y-1">
                      {announcements.map(a => (
                        <div key={a.id} className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                           <span className="text-[10px] truncate max-w-[200px] text-slate-300">{a.text}</span>
                           <button onClick={() => deleteAnnouncement(a.id)} className="text-red-400"><Trash2 size={10} /></button>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Quick Discounts */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-green-400 flex items-center gap-1"><Ticket size={12} /> Nuevo Descuento</label>
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newDiscount.code}
                        onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
                        placeholder="CÓDIGO"
                        className="w-1/3 bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white uppercase"
                      />
                      <input 
                        type="text" 
                        value={newDiscount.desc}
                        onChange={(e) => setNewDiscount({...newDiscount, desc: e.target.value})}
                        placeholder="Descripción"
                        className="flex-1 bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white"
                      />
                      <button onClick={addDiscount} className="bg-green-600 text-black px-2 py-1 rounded text-xs font-bold"><Plus size={14}/></button>
                   </div>
                   <div className="max-h-24 overflow-y-auto space-y-1">
                      {discountCodes.map(d => (
                        <div key={d.id} className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                           <span className="text-[10px] text-green-300 font-mono">{d.code}</span>
                           <button onClick={() => deleteDiscount(d.id)} className="text-red-400"><Trash2 size={10} /></button>
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          )}
        </>
      )}

      {/* Announcements & Discount Bar */}
      {(announcements.length > 0 || discountCodes.length > 0) && (
        <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white text-xs font-bold py-2 relative overflow-hidden z-40">
          <div className="flex animate-marquee whitespace-nowrap">
            {announcements.map((ann, i) => (
              <span key={`a-${ann.id}`} className="mx-8 flex items-center gap-2">
                 <Bell size={12} className="text-yellow-400" /> {ann.text}
              </span>
            ))}
            {discountCodes.map((disc, i) => (
              <span key={`d-${disc.id}`} className="mx-8 flex items-center gap-2 text-green-300">
                 <Ticket size={12} /> CÓDIGO: {disc.code} ({disc.description})
              </span>
            ))}
             {/* Duplicates for marquee effect */}
             {announcements.map((ann, i) => (
              <span key={`dup-a-${ann.id}`} className="mx-8 flex items-center gap-2">
                 <Bell size={12} className="text-yellow-400" /> {ann.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed w-full z-30 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-purple-900/5 top-8 md:top-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => handleNav('HOME')} className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-gradient-to-tr from-purple-600 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-purple-600/20">
                <Shield className="text-white h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SISTEMA<span className="text-purple-500">PERÚ</span></span>
            </button>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => handleNav('HOME')} className={`text-sm font-medium transition-colors ${view === 'HOME' ? 'text-purple-400' : 'hover:text-purple-400'}`}>Inicio</button>
              <button onClick={() => handleNav('CATALOG')} className={`text-sm font-medium transition-colors ${view === 'CATALOG' ? 'text-purple-400' : 'hover:text-purple-400'}`}>Catálogo</button>
              <button onClick={() => handleNav('REFERENCES')} className={`text-sm font-medium transition-colors ${view === 'REFERENCES' ? 'text-purple-400' : 'hover:text-purple-400'}`}>Referencias</button>
              <a 
                href="https://t.me/SistemaPeruOfical" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#229ED9] hover:bg-[#1e8dbf] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Send size={14} /> Telegram
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#050505] border-b border-white/10 p-4 space-y-4 animate-in slide-in-from-top-10">
            <button onClick={() => handleNav('HOME')} className="block w-full text-left text-sm font-medium hover:text-purple-400">Inicio</button>
            <button onClick={() => handleNav('CATALOG')} className="block w-full text-left text-sm font-medium hover:text-purple-400">Catálogo</button>
            <button onClick={() => handleNav('REFERENCES')} className="block w-full text-left text-sm font-medium hover:text-purple-400">Referencias</button>
          </div>
        )}
      </nav>

      <main className="pt-28 min-h-screen flex flex-col">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
          <section className="flex-1 flex flex-col relative overflow-hidden pb-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            {/* HERO CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-12 animate-in fade-in zoom-in duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-8">
                <Zap size={14} /> Servicios Garantizados
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
                SOLUCIONES REALES <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SIN RASTRO</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Trámites, Gobierno, Finanzas y Hacking. 
                Seguridad, privacidad y rapidez en cada gestión.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => handleNav('CATALOG')} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20">
                  <LayoutGrid size={20} /> Ver Catálogo Completo
                </button>
                <button onClick={() => handleNav('REFERENCES')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 border border-white/10">
                  <Star size={20} /> Referencias
                </button>
              </div>
              <div className="mt-12 flex justify-center gap-6">
                 <a href="https://wa.me/51939544566" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-green-500 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><Phone size={24} /></div>
                   <span className="text-xs">WhatsApp</span>
                 </a>
                 <a href="https://t.me/SistemaPeruOfical" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><Send size={24} /></div>
                   <span className="text-xs">Telegram</span>
                 </a>
              </div>
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="max-w-7xl mx-auto px-4 mt-24 w-full relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="text-yellow-500" /> Destacados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} onClick={() => handleNav('CATALOG')} className="group cursor-pointer bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 relative overflow-hidden bg-slate-900">
                      {product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" /> : <div className="flex items-center justify-center h-full text-slate-700"><ImageIcon size={32} /></div>}
                      <div className="absolute top-3 left-3"><span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-white">{CATEGORIES[product.category]}</span></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-md font-bold text-white mb-1 line-clamp-1">{product.title}</h3>
                      <p className="text-purple-400 font-bold text-sm">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                 <button onClick={() => handleNav('CATALOG')} className="text-slate-400 hover:text-white text-sm font-medium underline underline-offset-4">Ver todos los productos</button>
              </div>
            </div>

          </section>
        )}

        {/* VIEW: CATALOG */}
        {view === 'CATALOG' && (
          <section className="py-12 px-4 max-w-7xl mx-auto w-full animate-in slide-in-from-right duration-500">
            
            {/* Admin Editor Form */}
            {isAdmin && (
              <div ref={formTopRef} className="mb-12 bg-slate-900/90 border border-purple-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600"></div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  {editingId ? <Pencil className="text-purple-400" /> : <Plus className="text-purple-400" />} 
                  {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                  {isAnalyzing && <span className="text-xs text-purple-400 flex items-center gap-2 ml-4 animate-pulse"><Loader2 size={12} className="animate-spin" /> IA Analizando...</span>}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <input type="text" placeholder="Título" value={newProd.title} onChange={e => setNewProd({...newProd, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Precio" value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-purple-500" />
                      <select value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value as Category})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-slate-300 focus:border-purple-500">
                        {Object.keys(CATEGORIES).map(k => <option key={k} value={k}>{CATEGORIES[k as Category]}</option>)}
                      </select>
                    </div>
                    <textarea placeholder="Descripción..." value={newProd.description} onChange={e => setNewProd({...newProd, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white h-24 resize-none focus:border-purple-500" />
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => prodFileRef.current?.click()} className="w-full h-32 bg-black/30 border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-lg flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group">
                      {newProd.imageUrl ? <img src={newProd.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" /> : <Upload size={24} className="mb-2" />}
                      <span className="relative z-10 text-xs font-bold">{newProd.imageUrl ? 'Cambiar Imagen' : 'Subir Imagen (IA)'}</span>
                    </button>
                    <input type="file" ref={prodFileRef} className="hidden" accept="image/*" onChange={handleProdImage} />
                    
                    <div className="flex gap-2">
                      <input type="text" placeholder="Característica..." value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFeature()} className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white" />
                      <button onClick={addFeature} className="bg-white/10 p-3 rounded-lg hover:bg-white/20"><Plus size={18} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProd.features?.map((f, i) => <span key={i} className="text-[10px] bg-purple-900/30 text-purple-300 px-2 py-1 rounded border border-purple-500/30">{f}</span>)}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button onClick={saveProduct} disabled={isAnalyzing} className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                    <Save size={18} /> {editingId ? 'Actualizar Producto' : 'Publicar Producto'}
                  </button>
                  {editingId && (
                    <button onClick={cancelEdit} className="bg-red-500/20 text-red-400 px-6 py-3 rounded-lg font-bold hover:bg-red-500/30">Cancelar</button>
                  )}
                </div>
              </div>
            )}

            {/* Filters & Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
              <div>
                <button onClick={() => handleNav('HOME')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm mb-4"><ArrowLeft size={14} /> Volver</button>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <LayoutGrid className="text-purple-500" /> Catálogo
                </h2>
              </div>
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
                <button onClick={() => setFilter('ALL')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'ALL' ? 'bg-white text-black' : 'bg-white/5 text-slate-400'}`}>Todo</button>
                {Object.keys(CATEGORIES).map(cat => (
                  <button key={cat} onClick={() => setFilter(cat as Category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                    {CATEGORIES[cat as Category]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/10">
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(product)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"><Pencil size={16} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"><Trash2 size={16} /></button>
                    </div>
                  )}
                  <div className="h-48 relative overflow-hidden bg-slate-900 shrink-0">
                    {product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" /> : <div className="flex items-center justify-center h-full text-slate-700"><ImageIcon size={48} /></div>}
                    <div className="absolute top-4 left-4"><span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-white">{CATEGORIES[product.category]}</span></div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-bold text-white leading-tight">{product.title}</h3>
                      <span className="text-emerald-400 font-bold font-mono whitespace-nowrap">{product.price}</span>
                    </div>
                    
                    {/* Description with Expand/Collapse logic */}
                    <div className="mb-4 relative">
                      <p className={`text-slate-400 text-xs whitespace-pre-wrap ${expandedIds.has(product.id) ? '' : 'line-clamp-4'}`}>
                        {product.description}
                      </p>
                      {product.description.length > 150 && (
                        <button 
                          onClick={(e) => toggleExpandDescription(e, product.id)}
                          className="mt-2 text-[10px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          {expandedIds.has(product.id) ? <><ChevronUp size={10} /> Ver menos</> : <><ChevronDown size={10} /> Ver más detalles</>}
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                      {product.features?.slice(0, 3).map((feat, idx) => <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-300"><CheckCircle2 size={12} className="text-purple-500" /> {feat}</div>)}
                    </div>
                    <a href={product.buyLink} target="_blank" rel="noreferrer" className="w-full py-2.5 rounded-lg font-bold text-xs bg-white/5 hover:bg-green-600 hover:text-white text-slate-300 transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-transparent">
                      <Phone size={14} /> CONSULTAR
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW: REFERENCES */}
        {view === 'REFERENCES' && (
          <section className="py-12 px-4 max-w-7xl mx-auto w-full animate-in slide-in-from-right duration-500">
             {isAdmin && (
              <div className="mb-12 bg-slate-900/90 border border-blue-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <h3 className="text-xl font-bold text-white mb-4">Nueva Referencia</h3>
                 <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-3">
                      <input type="text" placeholder="Cliente" value={newRef.clientName} onChange={e => setNewRef({...newRef, clientName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                      <input type="text" placeholder="Servicio" value={newRef.serviceName} onChange={e => setNewRef({...newRef, serviceName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                    </div>
                    <button onClick={() => refFileRef.current?.click()} className="h-20 w-20 border border-dashed border-white/20 rounded-lg flex items-center justify-center hover:bg-white/5 relative overflow-hidden">
                       {newRef.imageUrl ? <img src={newRef.imageUrl} className="absolute inset-0 w-full h-full object-cover" /> : <ImageIcon className="text-slate-500" />}
                    </button>
                    <input type="file" ref={refFileRef} className="hidden" accept="image/*" onChange={handleRefImage} />
                    <button onClick={createReference} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold h-10 self-center">Subir</button>
                 </div>
              </div>
            )}

            <div className="mb-8">
               <button onClick={() => handleNav('HOME')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm mb-4"><ArrowLeft size={14} /> Volver</button>
               <h2 className="text-3xl font-bold text-white flex items-center gap-3"><Star className="text-yellow-400 fill-yellow-400" /> Referencias Reales</h2>
               <p className="text-slate-400 mt-2">Nuestros clientes hablan por nosotros.</p>
            </div>

            {references.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <Star size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No hay referencias publicadas aún.</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                {references.map(ref => (
                    <div key={ref.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/30 transition-colors">
                    {isAdmin && <button onClick={() => deleteReference(ref.id)} className="absolute top-2 right-2 z-20 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-md transition-all"><Trash2 size={16} /></button>}
                    <img src={ref.imageUrl} alt="Voucher" className="w-full h-auto object-cover hover:opacity-90 transition-opacity cursor-pointer" onClick={() => window.open(ref.imageUrl, '_blank')} />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10">
                        <p className="font-bold text-white text-sm">{ref.clientName}</p>
                        <p className="text-[10px] text-slate-400">{ref.serviceName} • {ref.date}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-xs">© 2024 SISTEMA PERÚ. Servicios garantizados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
