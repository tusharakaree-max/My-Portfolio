import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Plus, 
  Trash2, 
  X, 
  FileCheck, 
  Upload, 
  Compass, 
  Database, 
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  image: string; // Base64 data-url or unsplash external-url
  verifyUrl?: string;
  isUserUploaded: boolean;
}

const DEFAULT_CERTIFICATES: Certificate[] = [];

// Helper function to compress images using Canvas to fit into LocalStorage quota
const compressImage = (base64Str: string, maxWidth = 1000, maxHeight = 700): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG with 0.7 quality to significantly reduce file size
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export default function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  
  // Form fields
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCredId, setNewCredId] = useState('');
  const [newSkillsInput, setNewSkillsInput] = useState('');
  const [newVerifyUrl, setNewVerifyUrl] = useState('');
  const [newImage, setNewImage] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('tushar_certificates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Combine system defaults with user uploaded certificates
        const userCerts = parsed.filter((c: Certificate) => c.isUserUploaded);
        setCerts(userCerts);
      } catch (e) {
        setCerts([]);
      }
    } else {
      setCerts([]);
    }
  }, []);

  const saveCerts = (updatedList: Certificate[]) => {
    // Only save user uploaded ones to localStorage to keep sizes predictable
    const userUploadedOnly = updatedList.filter(c => c.isUserUploaded);
    try {
      localStorage.setItem('tushar_certificates', JSON.stringify(userUploadedOnly));
      setCerts(userUploadedOnly);
    } catch (e) {
      console.error("Local storage quota exceeded. Unable to save certificate.", e);
      alert("Uh oh! Browser's local storage quota is full. Try uploading a different or smaller photo.");
      setCerts(userUploadedOnly);
    }
  };

  // Convert File to Base64 and compress it
  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsCompressing(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            const originalBase64 = e.target.result as string;
            const compressed = await compressImage(originalBase64);
            setNewImage(compressed);
          } catch (err) {
            console.error("Error compressing image:", err);
            setNewImage(e.target.result as string);
          } finally {
            setIsCompressing(false);
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newIssuer || !newDate) {
      alert('Title, Issuer, and Date are required.');
      return;
    }

    // Default image if none uploaded
    const fallbackImage = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop';

    const newCertItem: Certificate = {
      id: `custom-cert-${Date.now()}`,
      title: newTitle,
      issuer: newIssuer,
      date: newDate,
      credentialId: newCredId || undefined,
      skills: newSkillsInput ? newSkillsInput.split(',').map(s => s.trim()).filter(Boolean) : ['Data Analysis'],
      image: newImage || fallbackImage,
      verifyUrl: newVerifyUrl || undefined,
      isUserUploaded: true
    };

    const updated = [...certs, newCertItem];
    saveCerts(updated);

    // Reset fields
    setNewTitle('');
    setNewIssuer('');
    setNewDate('');
    setNewCredId('');
    setNewSkillsInput('');
    setNewVerifyUrl('');
    setNewImage('');
    setShowUploadModal(false);
  };

  const handleDeleteCert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening modal
    if (window.confirm('Are you sure you want to remove this certificate?')) {
      const updated = certs.filter(c => c.id !== id);
      saveCerts(updated);
      if (selectedCert?.id === id) {
        setSelectedCert(null);
      }
    }
  };

  return (
    <section id="certificates" className="section-padding relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-electric font-bold tracking-widest uppercase text-sm block mb-4">Credentials</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Certifications & <span className="text-gradient">Academics.</span>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <p className="text-slate-400 max-w-sm md:text-right leading-relaxed text-sm">
            Validating professional skills, rigor, and theoretical mastery in business intelligence and data pipeline analysis.
          </p>
          <button 
            id="add-cert-btn"
            onClick={() => setShowUploadModal(true)}
            className="btn-primary py-2 px-5 text-xs flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {certs.map((cert, idx) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedCert(cert)}
              className="group glass-card rounded-[2rem] overflow-hidden border-white/5 hover:border-white/20 hover:shadow-electric/10 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-auto min-h-[480px] pb-6 relative"
            >
              {/* Aspect Ratio Container for Full Uncropped Image */}
              <div className="relative aspect-[16/10] bg-navy-black/40 p-4 border-b border-white/5 flex items-center justify-center overflow-hidden rounded-t-[2rem] shrink-0">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-md group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Holographic glowing line animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-electric via-neon to-cyan-glow transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20" />
                
                {/* Top overlay buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  {cert.isUserUploaded && (
                    <button 
                      id={`delete-btn-${cert.id}`}
                      onClick={(e) => handleDeleteCert(cert.id, e)}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-100 hover:border-red-500 transition-all duration-300 pointer-events-auto backdrop-blur-md"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="bg-navy-black/60 border border-white/10 backdrop-blur-md p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-neon" />
                  </div>
                </div>
              </div>

              {/* Content Body Below Image */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-electric font-bold text-xs uppercase tracking-wider">{cert.issuer}</span>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {cert.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-4 line-clamp-2 group-hover:text-cyan-glow transition-colors">
                    {cert.title}
                  </h3>
                  
                  {cert.credentialId && (
                    <div className="mb-4">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Credential ID</span>
                      <span className="text-[11px] font-mono font-bold tracking-tight text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                  
                  {/* Skill verified badges */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map(skill => (
                      <span key={skill} className="text-[9px] font-mono border border-white/5 bg-white/5 px-2.5 py-1 rounded-md text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {certs.length === 0 && (
          <div className="col-span-full py-16 text-center glass-card rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center">
            <Award className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
            <h4 className="text-xl font-display font-semibold text-white mb-2">No certificates uploaded yet</h4>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              You haven't uploaded any certificates yet. Click the button below or drop an image file to showcase your credentials!
            </p>
            <button 
              id="empty-add-btn"
              onClick={() => setShowUploadModal(true)}
              className="btn-outline py-2 px-6 text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Certificate
            </button>
          </div>
        )}
      </div>

      {/* Details/Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-black/90 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-card max-w-2xl w-full rounded-3xl overflow-hidden border-white/10 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                id="close-cert-modal"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-black/60 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Holographic Glowing Top Accents */}
              <div className="h-1 bg-gradient-to-r from-electric via-neon to-cyan-glow" />

              {/* Large Image Showcase of Full Uncropped Certificate */}
              <div className="relative aspect-[16/10] bg-navy-black/60 border-b border-white/5 flex items-center justify-center p-6 overflow-hidden">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-xl brightness-100"
                />
              </div>

              {/* Certificate Metadata Panel */}
              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-cyan-glow font-bold text-xs uppercase tracking-widest block mb-1">
                      {selectedCert.issuer} Certification
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                      {selectedCert.title}
                    </h3>
                  </div>
                  
                  {selectedCert.verifyUrl && (
                    <a 
                      id="verify-link"
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-6 text-xs flex items-center gap-2 self-start sm:self-auto uppercase tracking-wider"
                    >
                      <FileCheck className="w-4 h-4" /> Verify Credential
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-white/5 my-6 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs uppercase font-mono tracking-widest mb-1">Date Issued</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-electric" /> {selectedCert.date}
                    </span>
                  </div>
                  {selectedCert.credentialId && (
                    <div>
                      <span className="text-slate-500 block text-xs uppercase font-mono tracking-widest mb-1">Credential ID</span>
                      <span className="text-white font-bold tracking-tight bg-white/5 px-2 py-1 rounded border border-white/5">
                        {selectedCert.credentialId}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block text-xs uppercase font-mono tracking-widest mb-1">Type</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <Award className="w-4 h-4 text-neon" /> 
                      Uploaded Credential
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs uppercase font-mono tracking-widest mb-2">Verified Competencies</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map(skill => (
                      <span key={skill} className="text-xs font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload/Add Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-black/95 backdrop-blur-xl"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-card max-w-lg w-full rounded-3xl overflow-hidden border-white/10 relative shadow-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button 
                id="close-upload-modal"
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-black/60 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-navy-black/20">
                <Award className="w-6 h-6 text-electric" />
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">Add Your Certification</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Showcase your verified analytics skills</p>
                </div>
              </div>

              {/* Scrollable form inside modal */}
              <form onSubmit={handleAddCert} className="overflow-y-auto p-6 flex-grow space-y-5">
                {/* Drag and Drop File Input */}
                <div>
                  <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-2">
                    Certificate Image / Graphic
                  </label>
                  
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      dragActive 
                        ? 'border-cyan-glow bg-cyan-glow/5 shadow-inner' 
                        : newImage 
                        ? 'border-solid border-white/20 bg-white/5' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="hidden"
                    />

                    {isCompressing ? (
                      <div className="space-y-2 py-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto animate-spin">
                          <Compass className="w-5 h-5 text-cyan-glow" />
                        </div>
                        <p className="text-sm text-cyan-glow font-medium">Processing & compressing image...</p>
                        <p className="text-[10px] text-slate-500">Optimizing file size for web compatibility</p>
                      </div>
                    ) : newImage ? (
                      <div className="space-y-3">
                        <div className="relative mx-auto w-32 aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                          <img src={newImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewImage('');
                            }}
                            className="absolute inset-0 bg-red-950/70 opacity-0 hover:opacity-100 flex items-center justify-center text-red-100 transition-opacity"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-cyan-glow font-medium flex items-center justify-center gap-1">
                          <FileCheck className="w-3.5 h-3.5" /> Image uploaded successfully!
                        </p>
                        <p className="text-[10px] text-slate-500">Click to replace</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                          <Upload className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-200 font-medium">Drag & Drop certificate here</p>
                        <p className="text-xs text-slate-500">or click to browse from device (PNG, JPG, WEBP)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Grid fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                      Certificate Title *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Google Advanced Analytics"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors focus:ring-1 focus:ring-electric"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                      Issuer *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Google, Coursera, IBM"
                      value={newIssuer}
                      onChange={(e) => setNewIssuer(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors focus:ring-1 focus:ring-electric"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                      Issue Date *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. June 2026"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors focus:ring-1 focus:ring-electric"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                      Credential ID (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. ID-8874-99D"
                      value={newCredId}
                      onChange={(e) => setNewCredId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                    Skills Verified (Comma Separated)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. SQL, Python, Excel, Machine Learning"
                    value={newSkillsInput}
                    onChange={(e) => setNewSkillsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Separate skills using commas so we can turn them into clean, separate tags.</p>
                </div>

                <div>
                  <label className="text-slate-400 text-xs uppercase font-mono tracking-wider block mb-1">
                    Verification URL (Optional)
                  </label>
                  <input 
                    type="url"
                    placeholder="e.g. https://coursera.org/... or https://link.to/your-cert"
                    value={newVerifyUrl}
                    onChange={(e) => setNewVerifyUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-electric transition-colors"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                  <button 
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="btn-outline px-5 py-2 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary px-6 py-2 text-sm flex items-center gap-2"
                  >
                    Add Certificate
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
