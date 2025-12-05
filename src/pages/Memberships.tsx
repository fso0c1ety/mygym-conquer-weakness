import { Check, CreditCard, Star, TrendingUp, ArrowLeft } from "lucide-react";
import { memberships } from "@/lib/memberships";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Memberships = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-colors border border-border/50"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </button>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                  <img
                    src={logo}
                    alt="MY GYM"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">MY GYM</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">There's no weakness</p>
              </div>
            </div>
          </div>

          <div className="card-gradient-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                Membership Plans
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-1 sm:mb-2">
              Choose Your Path
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Unlock your potential with our membership plans
            </p>
          </div>
        </header>

        <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
          {memberships.map((membership) => (
            <div
              key={membership.id}
              className={`relative overflow-hidden card-gradient-glow rounded-xl sm:rounded-2xl backdrop-blur-sm ${
                membership.popular ? "border-2 border-primary/40" : "border border-border/50"
              }`}
            >
              {membership.popular && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 glow-primary px-2 sm:px-3 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" />
                    <span className="hidden xs:inline">Most Popular</span>
                    <span className="xs:hidden">Popular</span>
                  </Badge>
                </div>
              )}
              
              <div className={`relative h-32 sm:h-36 bg-gradient-to-br ${membership.color} p-4 sm:p-6 flex flex-col justify-center items-center text-center overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="p-1 sm:p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wide">
                      {membership.period}ly Plan
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {membership.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      ${membership.price}
                    </span>
                    <span className="text-base sm:text-lg text-white/90 font-semibold">/{membership.period}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-b from-card/50 to-card/30 backdrop-blur-sm">
                <ul className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1 bg-primary/20 rounded-lg mt-0.5">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                      </div>
                      <span className="text-foreground font-medium text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-bold h-11 sm:h-12 text-sm sm:text-base glow-primary" 
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Memberships;
