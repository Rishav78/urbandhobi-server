import { AuthState } from "@urbandhobi/redux/authentication/auth.type";
import { WidgetsState } from "@urbandhobi/redux/widgets/widgets.type";

export interface RootReducer {
  auth: AuthState;
  widgets: WidgetsState;
}
