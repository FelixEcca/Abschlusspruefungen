import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react'
import { ExerciseViewHeader } from './ExerciseViewHeader'
import { ExerciseViewContent } from './ExerciseViewContent'
import { ExerciseViewFooter } from './ExerciseViewFooter'
import { ChatOverlay } from './ChatOverlay'

export function ExerciseViewLayout() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      {/* BG des Headers sauber setzen + padding statt margin */}
      <IonHeader className="ion-no-border bg-gray-100">
        <div className=" pb-2">
          <ExerciseViewHeader />
        </div>
      </IonHeader>

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8' } as React.CSSProperties}
      >
        <ExerciseViewContent />
      </IonContent>

      <IonFooter className="ion-no-border">
        <ExerciseViewFooter />
      </IonFooter>
      <ChatOverlay />
    </IonPage>
  )
}
