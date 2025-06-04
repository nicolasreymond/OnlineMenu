import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Admin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p style={{ padding: '1rem' }}>Admin dashboard placeholder</p>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
