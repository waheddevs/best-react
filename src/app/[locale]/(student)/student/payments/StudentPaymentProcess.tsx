"use client";

import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/Button";
import type { StudentPaymentsCopy } from "@/dictionaries/student/StudentPayments";
import {
  formatPreviewCardNumber,
  formatPreviewExpiry,
  formatPreviewSecurityCode,
  isValidPreviewCardNumber,
  isValidPreviewExpiry,
} from "@/lib/student/StudentPaymentValidation";

type StudentPaymentProcessProps = {
  copy: StudentPaymentsCopy;
};

export function StudentPaymentProcess({ copy }: StudentPaymentProcessProps) {
  const [numberValid, setNumberValid] = useState<boolean | null>(null);
  const [expiryValid, setExpiryValid] = useState<boolean | null>(null);
  const [expiryValue, setExpiryValue] = useState("");
  const [securityCodeValue, setSecurityCodeValue] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const securityCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function clearRestoredValues() {
      setExpiryValue("");
      setSecurityCodeValue("");
      setNumberValid(null);
      setExpiryValid(null);
      fieldsRef.current?.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) clearRestoredValues();
    }

    clearRestoredValues();
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.value = formatPreviewCardNumber(event.currentTarget.value);
    if (numberValid !== null) setNumberValid(isValidPreviewCardNumber(event.currentTarget.value));
  }

  function handleExpiryInput(event: FormEvent<HTMLInputElement>) {
    const formatted = formatPreviewExpiry(event.currentTarget.value);
    event.currentTarget.value = formatted;
    setExpiryValue(formatted);
    if (expiryValid !== null) setExpiryValid(isValidPreviewExpiry(formatted));
  }

  function handleSecurityCodeInput(event: FormEvent<HTMLInputElement>) {
    const digits = formatPreviewSecurityCode(event.currentTarget.value);
    event.currentTarget.value = digits;
    setSecurityCodeValue(digits);
  }

  function handleAutofill(event: AnimationEvent<HTMLDivElement>) {
    if (
      event.animationName !== "studentPaymentsAutofillDetected" ||
      !(event.target instanceof HTMLInputElement)
    ) {
      return;
    }

    event.target.value = "";
    if (event.target === expiryRef.current) {
      setExpiryValue("");
      setExpiryValid(null);
    } else if (event.target === securityCodeRef.current) {
      setSecurityCodeValue("");
    } else if (event.target.id === "student-card-number") {
      setNumberValid(null);
    }
  }

  return (
    <>
      <section aria-labelledby="student-payment-process" className="studentPayments__card">
        <div className="studentPayments__heading">
          <span aria-hidden="true" className="studentPayments__headingIcon">
            <CreditCardRounded />
          </span>
          <h2 id="student-payment-process">{copy.paymentProcess}</h2>
        </div>

        <div className="studentPayments__fields" onAnimationStart={handleAutofill} ref={fieldsRef}>
          <label>
            <span>{copy.cardholder}</span>
            <input autoComplete="off" placeholder="A. Example" type="text" />
          </label>
          <div className="studentPayments__fieldPair studentPayments__fieldPair--card">
            <div className="studentPayments__field">
              <label htmlFor="student-card-number">{copy.cardNumber}</label>
              <div className="studentPayments__inputWrap">
                <input
                  aria-describedby={numberValid === false ? "student-card-number-error" : undefined}
                  aria-invalid={numberValid === false}
                  autoComplete="off"
                  id="student-card-number"
                  inputMode="numeric"
                  maxLength={23}
                  onBlur={(event) =>
                    setNumberValid(isValidPreviewCardNumber(event.currentTarget.value))
                  }
                  onChange={handleNumberChange}
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
                {numberValid === false ? (
                  <>
                    <button
                      aria-label={copy.cardNumberError}
                      className="studentPayments__validationIcon"
                      type="button"
                    >
                      ?
                    </button>
                    <span
                      className="studentPayments__tooltip"
                      id="student-card-number-error"
                      role="tooltip"
                    >
                      {copy.cardNumberError}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="studentPayments__field">
              <label htmlFor="student-card-expiry">{copy.expiry}</label>
              <div className="studentPayments__inputWrap">
                <input
                  aria-describedby={expiryValid === false ? "student-card-expiry-error" : undefined}
                  aria-invalid={expiryValid === false}
                  autoComplete="off"
                  id="student-card-expiry"
                  inputMode="numeric"
                  maxLength={5}
                  onBlur={(event) =>
                    setExpiryValid(isValidPreviewExpiry(event.currentTarget.value))
                  }
                  onChange={handleExpiryInput}
                  onFocus={(event) => {
                    if (event.currentTarget.value !== expiryValue) {
                      event.currentTarget.value = expiryValue;
                    }
                  }}
                  onInput={handleExpiryInput}
                  placeholder="MM/YY"
                  ref={expiryRef}
                  type="text"
                  value={expiryValue}
                />
                {expiryValid === false ? (
                  <>
                    <button
                      aria-label={copy.expiryError}
                      className="studentPayments__validationIcon"
                      type="button"
                    >
                      ?
                    </button>
                    <span
                      className="studentPayments__tooltip"
                      id="student-card-expiry-error"
                      role="tooltip"
                    >
                      {copy.expiryError}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="studentPayments__fieldPair">
            <label>
              <span>{copy.securityCode}</span>
              <input
                autoComplete="off"
                inputMode="numeric"
                maxLength={4}
                onChange={handleSecurityCodeInput}
                onFocus={(event) => {
                  if (event.currentTarget.value !== securityCodeValue) {
                    event.currentTarget.value = securityCodeValue;
                  }
                }}
                onInput={handleSecurityCodeInput}
                placeholder="•••"
                ref={securityCodeRef}
                type="password"
                value={securityCodeValue}
              />
            </label>
            <label>
              <span>{copy.amount}</span>
              <input autoComplete="off" inputMode="numeric" type="text" />
            </label>
          </div>
        </div>

        <button className="studentPayments__pay" onClick={() => setAlertOpen(true)} type="button">
          {copy.pay}
        </button>
      </section>
      <Dialog
        aria-describedby="student-payment-alert-message"
        aria-labelledby="student-payment-alert-title"
        onClose={() => setAlertOpen(false)}
        open={alertOpen}
        slotProps={{
          backdrop: { className: "publicShared__notificationDialogBackdrop" },
          paper: {
            className:
              "publicShared__notificationDialog publicShared__notificationDialogDefault publicShared__notificationDialogStudent",
          },
        }}
      >
        <DialogContent className="publicShared__notificationDialogContent">
          <span className="publicShared__notificationDialogIcon">
            <InfoOutlined aria-hidden="true" />
          </span>
          <div>
            <h2 className="publicShared__notificationDialogTitle" id="student-payment-alert-title">
              {copy.alertTitle}
            </h2>
            <p
              className="publicShared__notificationDialogMessage"
              id="student-payment-alert-message"
            >
              {copy.alertMessage}
            </p>
          </div>
        </DialogContent>
        <DialogActions className="publicShared__notificationDialogActions">
          <Button
            className="publicShared__notificationDialogConfirm"
            hoverEffect="jump"
            onClick={() => setAlertOpen(false)}
            shape="soft"
            size="small"
          >
            {copy.alertClose}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
