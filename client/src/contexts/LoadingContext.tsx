import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const showLoader = (text: string = "Loading...") => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const updateLoadingText = (text: string) => {
    setLoadingText(text);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        showLoader,
        hideLoader,
        setLoadingText: updateLoadingText,
      }}
    >
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-beige-200/95 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="absolute inset-0 border-4 border-warm-500/30 rounded-full"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 border-4 border-t-warm-600 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              <motion.div
                className="text-warm-800 text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {loadingText}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}