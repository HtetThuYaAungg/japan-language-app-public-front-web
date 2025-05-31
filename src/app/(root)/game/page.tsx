"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FlashCard from "@/components/flash_card";
import { useTranslation } from "react-i18next";
import { CustomAlertDialog } from "@/components/confirm_alert";

export default function QuizPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const nextRouteRef = useRef<string | null>(null);
  const hasPushedState = useRef(false);

  useEffect(() => {
    // Push state only once
    if (!hasPushedState.current) {
      history.pushState({ quizPage: true }, "");
      hasPushedState.current = true;
    }

    const onPopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (!showConfirm) {
        nextRouteRef.current = null;
        setShowConfirm(true);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [showConfirm]);

  // ✅ Intercept normal <a> link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href === location.pathname + location.search
      ) {
        return;
      }

      e.preventDefault();
      nextRouteRef.current = href;
      setShowConfirm(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Intercept tab close / refresh
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        t("quizExitConfirmation") || "Are you sure you want to leave?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [t]);

  // Handle confirm modal
  const handleLeave = () => {
    setShowConfirm(false);

    if (nextRouteRef.current) {
      router.push(nextRouteRef.current);
    } else {
      router.back();
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    nextRouteRef.current = null;
    history.pushState({ quizPage: true }, "");
  };

  return (
    <div className="px-2 font-z06-walone-bold relative">
      <FlashCard />

      <CustomAlertDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onCancel={handleCancel}
        cancelText="Cancel"
        confirmVariant="destructive"
        title="Are your sure to leave this page"
        description="Your content does not save "
        confirmText="I understand"
        onConfirm={handleLeave}
      />
    </div>
  );
}
