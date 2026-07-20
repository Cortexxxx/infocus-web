import { tagsService } from "@/services/api";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "@/context/AuthContext";
export const TagsContext = createContext();
export const useTags = () => useContext(TagsContext);

export function TagsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const { isAuthenticated } = useAuth();
  const handleAddTag = async (newTag) => {
    try {
      const response = await tagsService.create(newTag);
      setTags((prev) => [...prev, response]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      const response = await tagsService.delete(id);
      setTags((prev) => {
        return prev.filter((t) => t.id !== id);
      });
    } catch (error) {}
  };
  const getTagById = async (id) => {
    try {
      const data = await tagsService.get(id);
      return data;
    } catch (error) {
      return null;
    }
  };
  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const data = await tagsService.getAll();
      setTags(Array.isArray(data) ? data : []);
    } catch (error) {
      setTags([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchTags();
    } else {
      setTags([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  return (
    <TagsContext.Provider
      value={{
        tags,
        handleAddTag,
        handleDeleteTag,
        getTagById,
        fetchTags,
        isLoading,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}
