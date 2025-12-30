import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudSun, Shield, Info } from "lucide-react"
import type { Destination } from "@/lib/types"

interface InfoCardProps {
  destination: Destination | null | undefined
}

export function InfoCard({ destination }: InfoCardProps) {
  if (!destination) return null

  return (
    <div className="space-y-6">
      {/* Weather Info */}
      {destination.weather_info && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-primary" />
              Weather Information
            </CardTitle>
            <CardDescription>Best times to visit Barcelona</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(destination.weather_info).map(([season, info]) => (
              <div key={season} className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold capitalize mb-2">{season}</h4>
                <p className="text-sm text-muted-foreground">{info}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Safety Info */}
      {destination.safety_info && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Safety Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{destination.safety_info}</p>
          </CardContent>
        </Card>
      )}

      {/* Tipping Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Tipping Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Restaurants</h4>
            <p className="text-sm text-muted-foreground">
              Tipping is not mandatory in Spain. Service is included in the bill. However, leaving 5-10% for excellent
              service is appreciated.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Taxis</h4>
            <p className="text-sm text-muted-foreground">Round up to the nearest euro or add 5-10% for longer rides.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hotels</h4>
            <p className="text-sm text-muted-foreground">€1-2 per bag for porters, €2-5 per day for housekeeping.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
