"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  CheckCircle2,
  CreditCard,
  Lock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName?: string;
  courseType?: "video" | "studio";
}

const timeSlots = [
  "08:00", "09:30", "11:00", "14:00", "16:00", "18:00", "19:30"
];

const studioLocations = [
  "Studio Paris 11e - Republique",
  "Studio Paris 16e - Trocadero",
  "Studio Lyon 6e - Bellecour",
];

const coursePrice = {
  video: 19,
  studio: 29,
};

export function ReservationModal({ 
  open, 
  onOpenChange, 
  courseName = "Yoga", 
  courseType = "studio" 
}: ReservationModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    location: "",
    message: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
      if (formatted.length <= 19) {
        setPaymentData(prev => ({ ...prev, [field]: formatted }));
      }
    } else if (field === "expiry") {
      // Format expiry as MM/YY
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length >= 2) {
        formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      }
      if (formatted.length <= 5) {
        setPaymentData(prev => ({ ...prev, [field]: formatted }));
      }
    } else if (field === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 4) {
        setPaymentData(prev => ({ ...prev, [field]: cleaned }));
      }
    } else {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    onOpenChange(false);
    setStep(1);

    toast({
      title: "Paiement accepte - Cours reserve !",
      description: `Votre reservation pour ${courseName} le ${formData.date} a ${formData.time} a ete confirmee. Un email de confirmation vous a ete envoye.`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      location: "",
      message: "",
    });
    setPaymentData({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep(1);
    }
    onOpenChange(open);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.date && formData.time && (courseType === "video" || formData.location);
  const isPaymentValid = paymentData.cardNumber.replace(/\s/g, "").length === 16 && paymentData.cardName && paymentData.expiry.length === 5 && paymentData.cvv.length >= 3;

  const price = coursePrice[courseType];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            {step === 1 ? (
              <>
                <Calendar className="w-6 h-6 text-primary" />
                Reserver {courseName}
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6 text-primary" />
                Paiement securise
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? (courseType === "studio" 
                ? "Reservez votre place en studio pour une experience immersive."
                : "Planifiez votre session de yoga en ligne.")
              : "Finalisez votre reservation en toute securite."}
          </DialogDescription>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 py-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            1
          </div>
          <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            2
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Prenom
                </Label>
                <Input
                  id="firstName"
                  placeholder="Marie"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="marie@exemple.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Telephone (optionnel)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Horaire
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleInputChange("time", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {courseType === "studio" && (
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Studio
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleInputChange("location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un studio" />
                  </SelectTrigger>
                  <SelectContent>
                    {studioLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Avez-vous des besoins particuliers ou des questions ?"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={2}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!isStep1Valid}
            >
              Continuer vers le paiement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            {/* Order summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Recapitulatif</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{courseName}</span>
                <span>{price}.00 EUR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>{formData.date} a {formData.time}</span>
              </div>
              {courseType === "studio" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lieu</span>
                  <span className="text-right max-w-[200px]">{formData.location}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">{price}.00 EUR</span>
              </div>
            </div>

            {/* Card visual */}
            <div className="relative bg-gradient-to-br from-primary/90 to-accent/90 rounded-xl p-5 text-primary-foreground shadow-lg">
              <div className="absolute top-4 right-4">
                <CreditCard className="w-8 h-8 opacity-80" />
              </div>
              <div className="space-y-4">
                <div className="text-lg tracking-widest font-mono">
                  {paymentData.cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70">Titulaire</p>
                    <p className="font-medium uppercase">{paymentData.cardName || "VOTRE NOM"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">Expire</p>
                    <p className="font-medium">{paymentData.expiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  Numero de carte
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Nom sur la carte
                </Label>
                <Input
                  id="cardName"
                  placeholder="MARIE DUPONT"
                  value={paymentData.cardName}
                  onChange={(e) => handlePaymentChange("cardName", e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Date d{"'"}expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiry}
                    onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    value={paymentData.cvv}
                    onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Paiement securise
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-4 h-4 text-primary" />
                SSL 256-bit
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-4 h-4" />
                Annulation gratuite jusqu{"'"}a 24h avant le cours
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                En payant, vous acceptez nos conditions generales.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button"
                variant="outline" 
                size="lg"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <Button 
                type="submit" 
                size="lg"
                className="flex-[2]"
                disabled={!isPaymentValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Payer {price}.00 EUR
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
