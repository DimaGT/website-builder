import { useEditor, useNode } from '@craftjs/core';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useEditing } from '~/lib/editing-context';
import { TextSettings } from './text-settings';

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<'r' | 'g' | 'b' | 'a', number>;
  shadow: number;
  text: string;
  margin: [number, number, number, number];
  tagName: string;
};

const TextElement = forwardRef<HTMLElement, Partial<TextProps>>(
  (
    {
      fontSize = '16',
      textAlign = 'left',
      fontWeight = 'normal',
      color = { r: 0, g: 0, b: 0, a: 1 },
      shadow = 0,
      text = 'Double click to edit text',
      margin = [0, 0, 0, 0],
      tagName = 'p'
    },
    ref
  ) => {
    const {
      connectors: { connect, drag },
      setProp,
      id
    } = useNode();
    const { enabled } = useEditor(state => ({
      enabled: state.options.enabled
    }));
    const { editingNodeId, setEditingNodeId, selectedNodeId, setSelectedNodeId } = useEditing();

    const isEditing = editingNodeId === id;
    const isSelected = selectedNodeId === id;
    const [isDragging, setIsDragging] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    // Handle clicks outside the component to exit editing/selection mode
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
          // Check if the click is within the viewport (working area)
          const viewport = document.querySelector('.viewport');
          if (viewport && viewport.contains(event.target as Node)) {
            if (isEditing) {
              setEditingNodeId(null);
            }
            if (isSelected) {
              setSelectedNodeId(null);
            }
          }
        }
      };

      if (isEditing || isSelected) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isEditing, isSelected, setEditingNodeId, setSelectedNodeId]);

    const handleClick = () => {
      if (enabled && !isEditing) {
        setSelectedNodeId(id);
      }
    };

    const handleDoubleClick = () => {
      if (enabled) {
        setEditingNodeId(id);
        setSelectedNodeId(id);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      if (enabled) {
        setProp(prop => (prop.text = e.currentTarget.textContent || ''), 500);
        setEditingNodeId(null);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.blur();
      }
      if (e.key === 'Escape') {
        e.currentTarget.textContent = text;
        setEditingNodeId(null);
      }
    };

    const handleMouseDown = () => {
      if (enabled && !isEditing) {
        setIsDragging(true);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const applyRef = (node: HTMLElement) => {
      if (node) {
        // Store reference for click outside detection
        elementRef.current = node;

        // Apply drag functionality for dragging
        drag(node);
        // Apply connect for selection
        connect(node);

        // Forward the ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }
    };

    const elementProps = {
      ref: applyRef,
      contentEditable: enabled && isEditing,
      suppressContentEditableWarning: true,
      onClick: handleClick,
      onDoubleClick: handleDoubleClick,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      style: {
        width: '100%',
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${shadow / 100})`,
        fontWeight,
        textAlign,
        minHeight: '20px',
        outline: 'none',
        border:
          enabled && isEditing
            ? '2px solid #007bff'
            : enabled && isSelected
            ? '2px dashed #007bff'
            : 'none',
        padding: enabled && isEditing ? '4px' : enabled ? '2px' : '0',
        cursor:
          enabled && isEditing
            ? 'text'
            : enabled && isDragging
            ? 'grabbing'
            : enabled
            ? 'grab'
            : 'default',
        borderRadius: enabled && isEditing ? '4px' : '0',
        // userSelect: enabled && isEditing ? 'text' : 'none'
      }
    };

    return React.createElement(tagName, elementProps, text);
  }
);

TextElement.displayName = 'TextElement';

// Add craft configuration to the component
(TextElement as any).craft = {
  displayName: 'Text',
  props: {
    fontSize: '16',
    textAlign: 'left',
    fontWeight: 'normal',
    color: { r: 0, g: 0, b: 0, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: 'Double click to edit text',
    tagName: 'p'
  },
  related: {
    toolbar: TextSettings
  }
};

export const NodeText = TextElement;
export default NodeText;
