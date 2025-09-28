class ImageService {
  constructor() {
    this.useServer = process.env.VUE_APP_USE_SERVER === 'true';
    this.forceLocalStorage = process.env.VUE_APP_USE_SERVER === 'false';
    this.serverUrl = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000';
    this.currentMode = 'localStorage'; // Default to localStorage
    this.serverAvailable = false;
    
    // Test server availability if server mode is enabled or if no explicit mode is set
    if (this.useServer || (!this.useServer && !this.forceLocalStorage)) {
      this.checkServerAvailability();
    }
  }

  async checkServerAvailability() {
    // If explicitly forced to localStorage mode, skip server check
    if (this.forceLocalStorage) {
      this.fallbackToLocalStorage();
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(`${this.serverUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        this.serverAvailable = true;
        this.currentMode = 'server';
        console.log('Server mode active');
      } else {
        this.fallbackToLocalStorage();
      }
    } catch (error) {
      // Try a simple ping to the images endpoint as fallback
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const fallbackResponse = await fetch(`${this.serverUrl}/images`, {
          method: 'GET',
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (fallbackResponse.ok) {
          this.serverAvailable = true;
          this.currentMode = 'server';
          console.log('Server mode active (via fallback check)');
        } else {
          this.fallbackToLocalStorage();
        }
      } catch (fallbackError) {
        this.fallbackToLocalStorage();
      }
    }
  }

  fallbackToLocalStorage() {
    this.serverAvailable = false;
    this.currentMode = 'localStorage';
    console.log('Server unavailable, falling back to localStorage mode');
  }

  getCurrentMode() {
    return this.currentMode;
  }

  // Get all images
  async getAllImages() {
    if (this.currentMode === 'server' && this.serverAvailable) {
      try {
        const response = await fetch(`${this.serverUrl}/images`);
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Server request failed');
        }
      } catch (error) {
        console.warn('Server request failed, falling back to localStorage:', error);
        this.fallbackToLocalStorage();
        return this.getImagesFromLocalStorage();
      }
    } else {
      return this.getImagesFromLocalStorage();
    }
  }

  // Save image
  async saveImage(imageData) {
    const payload = {
      image: { src: imageData }
    };

    if (this.currentMode === 'server' && this.serverAvailable) {
      try {
        const response = await fetch(`${this.serverUrl}/images`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Server request failed');
        }
      } catch (error) {
        console.warn('Server save failed, falling back to localStorage:', error);
        this.fallbackToLocalStorage();
        return this.saveImageToLocalStorage(payload);
      }
    } else {
      return this.saveImageToLocalStorage(payload);
    }
  }

  // Delete all images
  async deleteAllImages() {
    if (this.currentMode === 'server' && this.serverAvailable) {
      try {
        const response = await fetch(`${this.serverUrl}/images`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Server request failed');
        }
      } catch (error) {
        console.warn('Server delete failed, falling back to localStorage:', error);
        this.fallbackToLocalStorage();
        return this.deleteAllImagesFromLocalStorage();
      }
    } else {
      return this.deleteAllImagesFromLocalStorage();
    }
  }

  // Delete single image (localStorage only for now)
  deleteImage(index) {
    const images = this.getImagesFromLocalStorage();
    images.splice(index, 1);
    localStorage.setItem('images', JSON.stringify(images));
    return images;
  }

  // LocalStorage methods
  getImagesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('images')) || [];
  }

  saveImageToLocalStorage(payload) {
    const images = this.getImagesFromLocalStorage();
    images.push(payload.image);
    localStorage.setItem('images', JSON.stringify(images));
    return payload;
  }

  deleteAllImagesFromLocalStorage() {
    localStorage.removeItem('images');
    return { success: true };
  }
}

// Export singleton instance
export default new ImageService();
