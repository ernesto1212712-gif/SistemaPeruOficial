

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
  Database,
  WifiOff,
  ChevronDown,
  ChevronUp,
  Settings,
  RefreshCw,
  Users,
  Link as LinkIcon
} from 'lucide-react';
import { Product, Reference, Category, CATEGORIES, Announcement, DiscountCode, AppConfig } from './types';
import { analyzeProductImage } from './services/geminiService';
import { supabase } from './services/supabaseClient';

// --- ICONS ---
const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// --- INITIAL DATA (Full Catalog) ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: '💸 CASH OUT - TRANSFERENCIAS',
    description: '¡TRANSFERENCIAS ENTRE CUENTAS AL INSTANTE! RETIRA DONDE SEA Y SAL DE MISIO EN MINUTOS.\nVALIDO PARA TODOS LOS BANCOS 💲\n\n💰 TABLA DE PRECIOS 💰\n🙄 Paga S/120 ➡️ Recibe S/3,500\n👾 Paga S/150 ➡️ Recibe S/4,700\n😦 Paga S/200 ➡️ Recibe S/5,800\n😨 Paga S/250 ➡️ Recibe S/7,500\n🔷 Paga S/330 ➡️ Recibe S/8,350\n🤐 Paga S/450 ➡️ Recibe S/9,600\n👿 Paga S/500 ➡️ Recibe S/12,000\n\n💲 TIEMPO DE ENTREGA 10 MINUTOS, MAXIMO.\nTENGO MUCHO MAS MULTISERVICIOS, HABLAME SIN COMPROMISO.',
    price: 'S/120 - S/500',
    category: 'METHODS',
    features: ['Transferencia 10 min', 'Todos los Bancos', 'Seguro y Anónimo', 'Garantía Total'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '2',
    title: '🔓 HACKING GENERAL & REDES',
    description: '🔘 SERVICIOS DE HACKING EN GENERAL\n- Clonar WhatsApp.\n- Recuperar y Hackear Facebook, Gmail, Hotmail, Twitter, Instagram, TikTok.\n- Hacking súper rápido y confidencial.\n- QUITO VERIFICACION DE 2 PASOS.\n- HACKEO DE WHATSAPP.',
    price: 'Consultar',
    category: 'CONFIGS',
    features: ['WhatsApp', 'Redes Sociales', 'Correos', 'Recuperación', 'Sin Rastro'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '3',
    title: '⚖️ SISTEMA GOBIERNO & RQ',
    description: '🔘 SE BORRA RQ POR CUALQUIER TIPO DE DELITO Y VEHICULOS EN 15 MINUTOS.\n🔘 SE PONER RQ A TUS ENEMIGOS EN MINUTOS (S1D4 DE REGALO).\n🔘 DENUNCIAS POLICIALES.\n🔘 USUARIOS PONER Y QUITAR DENUNCIAS.\n🔘 DENUNCIAS DIRECTO AL SISTEMA.',
    price: 'Premium',
    category: 'PROXIES',
    features: ['Borrar RQ', 'Poner RQ', 'Limpieza Vehicular', '15 Minutos', 'Denuncias'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '4',
    title: '🎓 TÍTULOS Y CERTIFICADOS',
    description: '🔘 SE REALIZA TITULOS UNIVERSITARIOS Y DE INSTITUTOS FIGURA EN SISTEMA.\n🔘 CAMBIO DE NOTAS ETC.\n🔘 CERTIFICADOS DE ESTUDIOS.\n🔘 NO TERMINASTE LA SECUNDARIA: TE SUBO AL SISTEMA CON LAS NOTAS QUE QUIERAS DIRECTO A MINEDU.\n🔘 NOTAS / UNIVERSIDAD PRIVADAS.',
    price: 'Consultar',
    category: 'PROXIES',
    features: ['Registrado en Sistema', 'MINEDU', 'Notas', 'Secundaria Completa'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '5',
    title: '🚗 BREVETES Y LICENCIAS',
    description: '🔘 LICENCIAS DE CONDUCIR FISICAS Y ELECTRONICAS DE AUTO - MOTO LINEAL - MOTOTAXI.\n🔘 SE QUITA RETENCIÓN DE LICENCIAS.\n🔘 ELIMINA PUNTOS.\n🔘 SE PONE PAPELETAS Y QUITA PAPELETAS.\n🔘 CAMBIO DATOS CUALQUIER VEHICULO.',
    price: 'S/ Consultar',
    category: 'PROXIES',
    features: ['Físicas y Electrónicas', 'Sin Examen', 'Eliminar Puntos', 'Legal'],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '6',
    title: '📊 INFOCORP & FINANZAS',
    description: '🔘 SE LIBERA DE INFOCORP.\n⭐️ BORRADO DE DEUDAS.\n⭐️ REPORTES FINANCIEROS / SENTINEL.\n⭐️ TE DEJAMOS EN VERDE PARA SACAR PRESTAMO EN MINUTOS 💰.',
    price: 'S/ Consultar',
    category: 'METHODS',
    features: ['Salir de Infocorp', 'Borrar Deudas', 'Historial Verde', 'Préstamos'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '7',
    title: '✈️ PASAJES AL 50%',
    description: '🔘 SE PAGA PASAJES VUELOS SKY - JETSMART - LATAM Y BUS CIVA - FLORES - LINEA - CRUZ DEL SUR ETC AL 50% DE DESCUENTO.',
    price: '50% OFF',
    category: 'TOOLS',
    features: ['Aéreos y Terrestres', 'Mitad de Precio', 'Reservas Reales', 'Todas las agencias'],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '8',
    title: '🍿 CINEPLANET & ENTRADAS',
    description: '🔘 DOY ENTRADAS Y COMBOS CINEPLANET CON 50% DE DESCUENTO.',
    price: '50% OFF',
    category: 'TOOLS',
    features: ['Entradas', 'Combos', 'Cineplanet', 'Códigos QR'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '9',
    title: '💳 TARJETAS & CC',
    description: '❕ PROVEEDOR DE TARJETAS ⚡️\n❕ CC TARJETAS CON SALDOS.\n✔️ VENTA DE BILLETES G5 DE 10 , 20 , 50 , 100 , 200 - BUENA CALIDAD.\n❕ PREGUNTAR SIN COMPROMISO.',
    price: 'Consultar',
    category: 'METHODS',
    features: ['CC con Saldo', 'Billetes G5', 'Alta Calidad', 'Envíos Caletas'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  },
  {
    id: '10',
    title: '📱 SERVICIOS VARIOS',
    description: '🔘 SE HACEN PAGOS 50% DE CUALQUIER RECIBO, SERVICIOS, UNIVERSIDADES.\n🔘 SOAT LA POSITIVA.\n🔘 SOAT PARA CUALQUIER VEHÍCULO CON DESCUENTO.\n🔘 DOXEO LIBRE.\n🔘 SEGUIDORES PARA CUALQUIER PLATAFORMA.',
    price: '50% OFF',
    category: 'TOOLS',
    features: ['Recibos 50%', 'SOAT Barato', 'Pago Pensiones', 'Seguidores'],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    buyLink: 'https://wa.me/51939544566'
  }
];

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

const INITIAL_CONFIG: AppConfig = {
  whatsapp: 'https://wa.me/51939544566',
  telegramPersonal: 'https://t.me/SistemaPeruOfical1',
  telegramGroup: 'https://t.me/SistemaPeruOficial',
  tiktok: 'https://www.tiktok.com/@pablito_ofcc?_r=1&_t=ZS-925AOPBhkwP'
};

type ViewState = 'HOME' | 'CATALOG' | 'REFERENCES';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [view, setView] = useState<ViewState>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Loading & Connection States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false); // Supabase Connection

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);

  // Edit/Create State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
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
  
  // Config Form State
  const [tempConfig, setTempConfig] = useState<AppConfig>(INITIAL_CONFIG);

  const prodFileRef = useRef<HTMLInputElement>(null);
  const refFileRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  // --- SHORTCUT ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // --- LOAD DATA (Supabase vs Local) ---
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // 1. Try Supabase
      if (supabase) {
        try {
          const { data: prods, error: prodError } = await supabase.from('products').select('*').order('id', { ascending: false });
          const { data: refs, error: refError } = await supabase.from('references').select('*').order('date', { ascending: false });
          const { data: anns, error: annError } = await supabase.from('announcements').select('*').order('createdAt', { ascending: false });
          const { data: discs, error: discError } = await supabase.from('discount_codes').select('*');
          const { data: settings, error: settingsError } = await supabase.from('app_settings').select('*').eq('id', 'global').single();

          if (!prodError) {
            // --- AUTO SEEDING LOGIC ---
            if (!prods || prods.length === 0) {
              console.log("Base de datos vacía. Subiendo productos iniciales...");
              const { error: seedError } = await supabase.from('products').insert(INITIAL_PRODUCTS);
              if (!seedError) {
                 setProducts(INITIAL_PRODUCTS);
              } else {
                 console.error("Error seeding DB:", seedError);
                 setProducts(INITIAL_PRODUCTS); 
              }
            } else {
              setProducts(prods);
            }
          } else {
            console.warn("Supabase Product Error:", prodError.message);
            setProducts(INITIAL_PRODUCTS);
          }
          
          if (!refError && refs) setReferences(refs);
          if (!annError && anns) setAnnouncements(anns);
          if (!discError && discs) setDiscountCodes(discs);
          
          if (!settingsError && settings) {
             const loadedConfig = {
               whatsapp: settings.whatsapp,
               telegramPersonal: settings.telegram_personal,
               telegramGroup: settings.telegram_group,
               tiktok: settings.tiktok
             };
             setConfig(loadedConfig);
             setTempConfig(loadedConfig);
          }

          setIsConnected(true);
          setIsLoading(false);
          return; 
        } catch (err) {
          console.error("Supabase connection error:", err);
          setIsConnected(false);
        }
      }

      // 2. Fallback to LocalStorage
      console.log("Using LocalStorage Fallback");
      try {
        const savedProds = localStorage.getItem('xs_store_v3_products');
        const savedRefs = localStorage.getItem('xs_store_v3_references');
        const savedAnnounce = localStorage.getItem('xs_store_v3_announcements');
        const savedDiscounts = localStorage.getItem('xs_store_v3_discounts');
        const savedConfig = localStorage.getItem('xs_store_v3_config');

        setProducts(savedProds ? JSON.parse(savedProds) : INITIAL_PRODUCTS);
        setReferences(savedRefs ? JSON.parse(savedRefs) : INITIAL_REFS);
        setAnnouncements(savedAnnounce ? JSON.parse(savedAnnounce) : INITIAL_ANNOUNCEMENTS);
        setDiscountCodes(savedDiscounts ? JSON.parse(savedDiscounts) : INITIAL_DISCOUNTS);
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig);
          setConfig(parsed);
          setTempConfig(parsed);
        }
      } catch (e) {
        console.error("Local storage corrupted", e);
        localStorage.clear();
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // --- CATALOG RESET (FIXED) ---
  const resetCatalog = async () => {
    if (!window.confirm("⚠️ ¿RESTAURAR CATÁLOGO DE FÁBRICA?\n\nEsto borrará todos los productos actuales de la base de datos y cargará la lista oficial predeterminada.\n\nEsta acción no se puede deshacer.")) return;
    
    setIsLoading(true);
    if (isConnected && supabase) {
        // 1. Delete all products
        const { error: deleteError } = await supabase.from('products').delete().neq('id', '0'); // Delete all where id is not 0 (effectively all)
        
        if (deleteError) {
            alert("Error limpiando base de datos: " + deleteError.message);
            setIsLoading(false);
            return;
        }

        // 2. Insert Initial Products
        const { error: insertError } = await supabase.from('products').insert(INITIAL_PRODUCTS);
        
        if (insertError) {
            alert("Error insertando productos: " + insertError.message);
        } else {
            setProducts(INITIAL_PRODUCTS);
            alert("✅ Catálogo restaurado correctamente.");
        }
    } else {
        localStorage.setItem('xs_store_v3_products', JSON.stringify(INITIAL_PRODUCTS));
        setProducts(INITIAL_PRODUCTS);
        alert("✅ Catálogo local restaurado.");
    }
    setIsLoading(false);
  };

  const saveConfig = async () => {
    setConfig(tempConfig);
    setShowConfigPanel(false);
    
    if (isConnected && supabase) {
      const { error } = await supabase.from('app_settings').upsert({
        id: 'global',
        whatsapp: tempConfig.whatsapp,
        telegram_personal: tempConfig.telegramPersonal,
        telegram_group: tempConfig.telegramGroup,
        tiktok: tempConfig.tiktok
      });
      if (error) alert("Error guardando config en nube: " + error.message);
      else alert("✅ Configuración guardada en Nube.");
    } else {
      localStorage.setItem('xs_store_v3_config', JSON.stringify(tempConfig));
      alert("✅ Configuración guardada localmente.");
    }
  };

  // --- IMAGE UPLOAD ---
  const uploadImage = async (file: File): Promise<string> => {
    if (isConnected && supabase) {
      setIsUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        return data.publicUrl;
      } catch (error) {
        console.error("Error uploading to Supabase:", error);
        return localCompress(file);
      } finally {
        setIsUploading(false);
      }
    }
    return localCompress(file);
  };

  const localCompress = (file: File): Promise<string> => {
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
  }

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
        const imageUrl = await uploadImage(file);
        setNewProd(prev => ({ ...prev, imageUrl }));

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
             const base64 = reader.result as string;
             const aiData = await analyzeProductImage(base64);
             setNewProd(prev => ({
                ...prev,
                title: aiData.title || prev.title,
                description: aiData.description || prev.description,
                price: aiData.price || prev.price,
                category: aiData.category || prev.category,
                features: aiData.features || prev.features,
                imageUrl 
             }));
             setIsAnalyzing(false);
        };
      } catch (err) {
        console.error("Error processing image", err);
        setIsAnalyzing(false);
      }
    }
  };

  const handleRefImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsUploading(true);
      const imageUrl = await uploadImage(e.target.files[0]);
      setNewRef({ ...newRef, imageUrl });
      setIsUploading(false);
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

  const saveProduct = async () => {
    if (!newProd.title || !newProd.price) return alert("Título y Precio requeridos");

    const productData: Product = {
      id: editingId || Date.now().toString(),
      title: newProd.title!,
      description: newProd.description || '',
      price: newProd.price!,
      category: newProd.category as Category || 'CONFIGS',
      features: newProd.features || [],
      imageUrl: newProd.imageUrl,
      buyLink: config.whatsapp
    };

    if (isConnected && supabase) {
       const { error } = await supabase.from('products').upsert(productData);
       if (error) {
         console.error(error);
         alert("Error guardando en base de datos. Verifica conexión.");
         return;
       }
       const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
       if (data) setProducts(data);
    } else {
       let updated;
       if (editingId) {
         updated = products.map(p => p.id === editingId ? productData : p);
       } else {
         updated = [productData, ...products];
       }
       setProducts(updated);
       localStorage.setItem('xs_store_v3_products', JSON.stringify(updated));
    }
    
    setEditingId(null);
    setNewProd({ title: '', price: '', description: '', category: 'CONFIGS', features: [], imageUrl: undefined });
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    
    // UI Optimistic Update
    const prevProducts = [...products];
    setProducts(products.filter(p => p.id !== id));

    if (isConnected && supabase) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            console.error("Delete Error:", error);
            alert("No se pudo eliminar de la base de datos (Error: " + error.message + "). Verifica tus Policies en Supabase.");
            setProducts(prevProducts); // Rollback
        }
    } else {
        const updated = prevProducts.filter(p => p.id !== id);
        localStorage.setItem('xs_store_v3_products', JSON.stringify(updated));
    }
  };

  const createReference = async () => {
    if (!newRef.imageUrl) return alert("La imagen es obligatoria");
    const reference: Reference = {
      id: Date.now().toString(),
      clientName: newRef.clientName || 'Cliente',
      serviceName: newRef.serviceName || 'Servicio',
      date: new Date().toLocaleDateString(),
      imageUrl: newRef.imageUrl
    };

    if (isConnected && supabase) {
        const { error } = await supabase.from('references').insert(reference);
        if (error) return alert("Error en DB: " + error.message);
        const { data } = await supabase.from('references').select('*').order('date', { ascending: false });
        if (data) setReferences(data);
    } else {
        const updated = [reference, ...references];
        setReferences(updated);
        localStorage.setItem('xs_store_v3_references', JSON.stringify(updated));
    }
    setNewRef({ clientName: '', serviceName: '', imageUrl: undefined });
  };

  const deleteReference = async (id: string) => {
     if (!window.confirm("¿Eliminar referencia permanentemente?")) return;
     const prevRefs = [...references];
     setReferences(references.filter(r => r.id !== id));

     if (isConnected && supabase) {
        const { error } = await supabase.from('references').delete().eq('id', id);
        if (error) {
            alert("Error borrando referencia: " + error.message);
            setReferences(prevRefs);
        }
     } else {
        localStorage.setItem('xs_store_v3_references', JSON.stringify(prevRefs.filter(r => r.id !== id)));
     }
  };

  const addAnnouncement = async () => {
    if(!newAnnounce.trim()) return;
    const ann: Announcement = {
      id: Date.now().toString(),
      text: newAnnounce,
      active: true,
      createdAt: new Date().toISOString()
    };

    if (isConnected && supabase) {
        await supabase.from('announcements').insert(ann);
        const { data } = await supabase.from('announcements').select('*').order('createdAt', { ascending: false });
        if(data) setAnnouncements(data);
    } else {
        const updated = [ann, ...announcements];
        setAnnouncements(updated);
        localStorage.setItem('xs_store_v3_announcements', JSON.stringify(updated));
    }
    setNewAnnounce('');
  };

  const deleteAnnouncement = async (id: string) => {
    if(!window.confirm("¿Borrar anuncio?")) return;
    if (isConnected && supabase) {
        await supabase.from('announcements').delete().eq('id', id);
        setAnnouncements(announcements.filter(a => a.id !== id));
    } else {
        const updated = announcements.filter(a => a.id !== id);
        setAnnouncements(updated);
        localStorage.setItem('xs_store_v3_announcements', JSON.stringify(updated));
    }
  }

  const addDiscount = async () => {
    if(!newDiscount.code.trim()) return;
    const disc: DiscountCode = {
      id: Date.now().toString(),
      code: newDiscount.code,
      description: newDiscount.desc,
      active: true
    };
    if (isConnected && supabase) {
        await supabase.from('discount_codes').insert(disc);
        const { data } = await supabase.from('discount_codes').select('*');
        if(data) setDiscountCodes(data);
    } else {
        const updated = [disc, ...discountCodes];
        setDiscountCodes(updated);
        localStorage.setItem('xs_store_v3_discounts', JSON.stringify(updated));
    }
    setNewDiscount({code: '', desc: ''});
  }

  const deleteDiscount = async (id: string) => {
    if (isConnected && supabase) {
        await supabase.from('discount_codes').delete().eq('id', id);
        setDiscountCodes(discountCodes.filter(d => d.id !== id));
    } else {
        const updated = discountCodes.filter(d => d.id !== id);
        setDiscountCodes(updated);
        localStorage.setItem('xs_store_v3_discounts', JSON.stringify(updated));
    }
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProd({ ...product });
    setView('CATALOG');
    setTimeout(() => formTopRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewProd({ title: '', price: '', description: '', category: 'CONFIGS', features: [], imageUrl: undefined });
  };

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

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-blue-900/10 animate-pulse"></div>
        <div className="relative z-10 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
            <Shield size={48} className="text-purple-500 mb-4 animate-bounce" />
            <h1 className="text-2xl font-black text-white tracking-widest">SISTEMA<span className="text-purple-500">PERÚ</span></h1>
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 font-mono">
              <Loader2 size={12} className="animate-spin" /> CARGANDO BASE DE DATOS...
            </div>
        </div>
      </div>
    );
  }

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

      {/* --- CONFIG PANEL MODAL --- */}
      {showConfigPanel && (
         <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-slate-900 border border-purple-500/50 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
               <h3 className="text-xl font-bold text-white flex items-center gap-2"><Settings className="text-purple-400"/> Configurar Redes Sociales</h3>
               <button onClick={() => setShowConfigPanel(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
             </div>
             
             <div className="space-y-4 mb-6">
               <div>
                  <label className="text-xs text-slate-400 mb-1 block">WhatsApp (Enlace Completo)</label>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded p-2">
                     <Phone size={16} className="text-green-500 mr-2"/>
                     <input type="text" value={tempConfig.whatsapp} onChange={(e) => setTempConfig({...tempConfig, whatsapp: e.target.value})} className="bg-transparent w-full text-sm text-white outline-none" />
                  </div>
               </div>
               <div>
                  <label className="text-xs text-slate-400 mb-1 block">Telegram Personal</label>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded p-2">
                     <Send size={16} className="text-blue-400 mr-2"/>
                     <input type="text" value={tempConfig.telegramPersonal} onChange={(e) => setTempConfig({...tempConfig, telegramPersonal: e.target.value})} className="bg-transparent w-full text-sm text-white outline-none" />
                  </div>
               </div>
               <div>
                  <label className="text-xs text-slate-400 mb-1 block">Telegram Grupo (Referencias)</label>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded p-2">
                     <Users size={16} className="text-blue-300 mr-2"/>
                     <input type="text" value={tempConfig.telegramGroup} onChange={(e) => setTempConfig({...tempConfig, telegramGroup: e.target.value})} className="bg-transparent w-full text-sm text-white outline-none" />
                  </div>
               </div>
               <div>
                  <label className="text-xs text-slate-400 mb-1 block">TikTok</label>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded p-2">
                     <TikTokIcon size={16} className="text-pink-500 mr-2"/>
                     <input type="text" value={tempConfig.tiktok} onChange={(e) => setTempConfig({...tempConfig, tiktok: e.target.value})} className="bg-transparent w-full text-sm text-white outline-none" />
                  </div>
               </div>
             </div>

             <div className="flex gap-2">
                <button onClick={() => setShowConfigPanel(false)} className="flex-1 bg-slate-800 text-white py-2 rounded font-bold hover:bg-slate-700">Cancelar</button>
                <button onClick={saveConfig} className="flex-1 bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-500">Guardar Cambios</button>
             </div>
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
            <div className="fixed bottom-20 right-4 z-50 w-full max-w-sm bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-10 fade-in duration-300 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                   <h3 className="font-bold text-white flex items-center gap-2"><Shield size={16} className="text-purple-500" /> Control Global</h3>
                   <button onClick={() => setIsAdmin(false)} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded hover:bg-red-900/50 border border-red-500/20">Cerrar Sesión</button>
                </div>
                
                {/* Connection Status */}
                <div className={`mb-4 text-xs flex items-center gap-2 px-3 py-2 rounded ${isConnected ? 'bg-green-900/20 text-green-400 border border-green-500/30' : 'bg-red-900/20 text-red-400 border border-red-500/30'}`}>
                   {isConnected ? <Database size={14} /> : <WifiOff size={14} />}
                   {isConnected ? 'Conectado a Nube (Supabase)' : 'Modo Local (Sin Nube)'}
                </div>

                {/* SOCIAL CONFIG BUTTON */}
                <div className="mb-4">
                  <button onClick={() => setShowConfigPanel(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 border border-white/10">
                    <LinkIcon size={14} /> ⚙️ CONFIGURAR REDES
                  </button>
                </div>

                {/* RESTORE BUTTON */}
                <div className="mb-6 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-[10px] text-blue-200 mb-2">Si los productos desaparecen o no se pueden borrar, usa esto:</p>
                    <button onClick={resetCatalog} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2">
                        <RefreshCw size={14} /> RESTAURAR CATÁLOGO
                    </button>
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
                href={config.tiktok}
                target="_blank" 
                rel="noreferrer"
                className="bg-black border border-white/20 hover:border-pink-500 hover:text-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
              >
                <TikTokIcon size={14} /> TikTok
              </a>
              <a 
                href={config.telegramPersonal}
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
            <a href={config.tiktok} target="_blank" rel="noreferrer" className="block w-full text-left text-sm font-medium hover:text-pink-500 flex items-center gap-2"><TikTokIcon size={14}/> TikTok</a>
            <a href={config.telegramPersonal} target="_blank" rel="noreferrer" className="block w-full text-left text-sm font-medium hover:text-blue-500 flex items-center gap-2"><Send size={14}/> Telegram</a>
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
              <div className="mt-12 flex justify-center gap-6 flex-wrap">
                 <a href={config.whatsapp} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-green-500 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><Phone size={24} /></div>
                   <span className="text-xs">WhatsApp</span>
                 </a>
                 <a href={config.telegramPersonal} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><Send size={24} /></div>
                   <span className="text-xs">Telegram</span>
                 </a>
                 <a href={config.tiktok} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><TikTokIcon size={24} /></div>
                   <span className="text-xs">TikTok</span>
                 </a>
                 <a href={config.telegramGroup} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-300 transition-colors flex flex-col items-center gap-1">
                   <div className="p-3 bg-white/5 rounded-full"><Users size={24} /></div>
                   <span className="text-xs">Grupo Ref</span>
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
                      {isUploading ? <Loader2 className="animate-spin" /> : (newProd.imageUrl ? <img src={newProd.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" /> : <Upload size={24} className="mb-2" />)}
                      <span className="relative z-10 text-xs font-bold">{isUploading ? 'Subiendo a Nube...' : (newProd.imageUrl ? 'Cambiar Imagen' : 'Subir Imagen')}</span>
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
                  <button onClick={saveProduct} disabled={isAnalyzing || isUploading} className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
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
                    <a href={config.whatsapp} target="_blank" rel="noreferrer" className="w-full py-2.5 rounded-lg font-bold text-xs bg-white/5 hover:bg-green-600 hover:text-white text-slate-300 transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-transparent">
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
                       {isUploading ? <Loader2 className="animate-spin" /> : (newRef.imageUrl ? <img src={newRef.imageUrl} className="absolute inset-0 w-full h-full object-cover" /> : <ImageIcon className="text-slate-500" />)}
                    </button>
                    <input type="file" ref={refFileRef} className="hidden" accept="image/*" onChange={handleRefImage} />
                    <button onClick={createReference} disabled={isUploading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold h-10 self-center">Subir</button>
                 </div>
              </div>
            )}

            <div className="mb-8">
               <button onClick={() => handleNav('HOME')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm mb-4"><ArrowLeft size={14} /> Volver</button>
               <h2 className="text-3xl font-bold text-white flex items-center gap-3"><Star className="text-yellow-400 fill-yellow-400" /> Referencias Reales</h2>
               <p className="text-slate-400 mt-2">Nuestros clientes hablan por nosotros.</p>
            </div>

            {/* TELEGRAM GROUP CTA */}
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-900/10">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">¿Quieres ver más pruebas en tiempo real?</h4>
                    <p className="text-slate-400 text-xs">Únete a nuestro canal oficial de referencias y comunidad.</p>
                  </div>
               </div>
               <a href={config.telegramGroup} target="_blank" rel="noreferrer" className="w-full md:w-auto bg-[#229ED9] hover:bg-[#1e8dbf] text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                  <Send size={18} /> Unirme al Grupo
               </a>
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
          <p className="text-slate-600 text-xs">© 2025 SISTEMA PERÚ. Servicios garantizados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
