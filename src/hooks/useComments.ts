import { useState, useEffect } from 'react';
import type { CharacterComment } from '../graphql/types';

const COMMENTS_STORAGE_KEY = 'rickandmorty_comments';

export const useComments = (characterId: string) => {
  const [comments, setComments] = useState<CharacterComment[]>([]);

  // Load comments from localStorage on mount
  useEffect(() => {
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (savedComments) {
      try {
        const allComments = JSON.parse(savedComments) as CharacterComment[];
        const characterComments = allComments.filter(comment => comment.characterId === characterId);
        setComments(characterComments);
      } catch (error) {
        console.error('Error loading comments from localStorage:', error);
      }
    }
  }, [characterId]);

  // Save comments to localStorage whenever it changes
  useEffect(() => {
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    let allComments: CharacterComment[] = [];
    
    if (savedComments) {
      try {
        allComments = JSON.parse(savedComments);
      } catch (error) {
        console.error('Error parsing saved comments:', error);
      }
    }

    // Remove old comments for this character and add new ones
    const otherComments = allComments.filter(comment => comment.characterId !== characterId);
    const updatedComments = [...otherComments, ...comments];
    
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(updatedComments));
  }, [comments, characterId]);

  const addComment = (text: string): void => {
    if (!text.trim()) return;

    const newComment: CharacterComment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      characterId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments(prev => [newComment, ...prev]);
  };

  const deleteComment = (commentId: string): void => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const editComment = (commentId: string, newText: string): void => {
    if (!newText.trim()) return;

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, text: newText.trim() }
        : comment
    ));
  };

  const getCommentsForCharacter = (charId: string): CharacterComment[] => {
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!savedComments) return [];

    try {
      const allComments = JSON.parse(savedComments) as CharacterComment[];
      return allComments.filter(comment => comment.characterId === charId);
    } catch (error) {
      console.error('Error loading comments:', error);
      return [];
    }
  };

  return {
    comments,
    addComment,
    deleteComment,
    editComment,
    getCommentsForCharacter,
    commentsCount: comments.length,
  };
};
