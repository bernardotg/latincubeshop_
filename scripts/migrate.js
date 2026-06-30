import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan variables de entorno. Revisa el archivo .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Importar los productos hardcodeados temporalmente
import { products } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../src/assets/products');

async function uploadImage(imagePath, filename) {
  try {
    const fileBuffer = fs.readFileSync(imagePath);
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`public/${filename}`, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) throw error;
    
    const { data: publicData } = supabase.storage
      .from('product-images')
      .getPublicUrl(`public/${filename}`);
      
    return publicData.publicUrl;
  } catch (err) {
    console.error(`Error subiendo ${filename}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log('Iniciando migración de productos...');

  for (const product of products) {
    console.log(`Migrando: ${product.name}`);
    
    // Asumimos que product.image era algo como '/src/assets/products/algo.jpg' en el build,
    // o simplemente buscamos el archivo en base a los nombres que sabemos que están en la carpeta.
    // Como en products.js hacíamos import, aquí buscaremos los archivos manuales en la carpeta si coinciden.
    
    // Para no complicar la lectura del import de vite, simplemente vamos a insertar los productos
    // con una URL vacía por ahora, y luego el usuario puede resubir las fotos en el AdminPanel, 
    // O si los nombres de archivo coinciden, podríamos hacer match.
    // En este caso, como los imports son variables, es complejo deducir el filename exacto aquí.
    
    // Insertar en la BD
    const { error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        price: product.price,
        category: product.category,
        is_new: product.isNew,
        stock: 10 // stock por defecto
      });
      
    if (error) {
      console.error(`Error insertando ${product.name}:`, error.message);
    } else {
      console.log(`✅ ${product.name} insertado.`);
    }
  }
  
  console.log('¡Migración completada!');
  console.log('Nota: Las imágenes deberán resubirse manualmente desde el Panel de Admin para que queden vinculadas a Storage.');
}

migrate();
