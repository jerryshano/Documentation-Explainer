"use client";

import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { createElement, type ButtonHTMLAttributes } from "react";

// Use CDN for icons/assets when bundling (no need to copy dist/assets to public)
setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/"
);

/**
 * Mount this once in the root layout so Shoelace is registered before any
 * <sl-*> usage. Renders nothing.
 */
export function ShoelaceSetup() {
  return null;
}

/** Props for the raw <sl-button> custom element (bundling style). */
export interface SlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "success" | "neutral" | "warning" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  outline?: boolean;
  pill?: boolean;
  circle?: boolean;
  caret?: boolean;
  href?: string;
  target?: string;
}

/**
 * Typed wrapper around the raw <sl-button> custom element.
 * Use this so TypeScript accepts props; the element is registered by <ShoelaceSetup />.
 */
export function SlButton({ children, ...props }: SlButtonProps) {
  return createElement("sl-button", props, children);
}
