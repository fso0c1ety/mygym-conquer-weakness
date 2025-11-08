import { Check } from "lucide-react";
import { memberships } from "@/lib/memberships";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";

const Memberships = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MY GYM" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-foreground">MY GYM</h1>
            <p className="text-xs text-muted-foreground">There's no weakness</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Path
          </h2>
          <p className="text-muted-foreground">
            Unlock your potential with our membership plans
          </p>
        </div>

        <div className="space-y-6">
          {memberships.map((membership) => (
            <Card
              key={membership.id}
              className={`relative overflow-hidden ${
                membership.popular ? "border-primary border-2" : ""
              }`}
            >
              {membership.popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className={`h-32 bg-gradient-to-br ${membership.color} p-6 flex flex-col justify-between`}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {membership.name}
                  </h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    ${membership.price}
                  </span>
                  <span className="text-white/80">/{membership.period}</span>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memberships;
