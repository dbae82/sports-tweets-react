import { useEffect, useReducer } from "react";
import axios from "axios";
import Rule from "./Rule";

const reducer = (state, action) => {
  switch (action.type) {
    case "show_rules":
      return { ...state, rules: action.payload, newRule: "" };
    case "add_rule":
      return {
        ...state,
        rules: [...state.rules, ...action.payload],
        newRule: "",
        errors: [],
      };
    case "add_errors":
      return { ...state, rules: state.rules, errors: action.payload };
    case "delete_rule":
      return {
        ...state,
        rules: [...state.rules.filter((rule) => rule.id !== action.payload)],
      };
    case "rule_changed":
      return { ...state, newRule: action.payload };
    case "change_loading_status":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const RuleList = () => {
  const initialState = { rules: [], newRule: "", isLoading: false, errors: [] };
  const [state, dispatch] = useReducer(reducer, initialState);
  const exampleRule = "nba lang:en";
  const ruleMeaning = `This example rule will match Tweets about the NBA that is in English`;
  const rulesURL = "http://localhost:4444/api/rules";

  const createRule = async (e) => {
    e.preventDefault();
    const payload = { add: [{ value: state.newRule }] };

    dispatch({ type: "change_loading_status", payload: true });
    try {
      const response = await axios.post(rulesURL, payload);
      if (response.data.body.errors) {
        dispatch({ type: "add_errors", payload: response.data.body.errors });
      } else {
        dispatch({ type: "add_rule", payload: response.data.body.data });
      }
      dispatch({ type: "change_loading_status", payload: false });
    } catch (error) {
      dispatch({
        type: "add_errors",
        payload: [{ detail: error.message }],
      });
      dispatch({ type: "change_loading_status", payload: false });
    }
  };

  const deleteRule = async (id) => {
    const payload = { delete: { ids: [id] } };
    dispatch({ type: "change_loading_status", payload: true });
    await axios.post(rulesURL, payload);
    dispatch({ type: "delete_rules", payload: id });
    dispatch({ type: "change_loading_status", payload: false });
  };

  const rules = () => {
    const { isLoading, rules } = state;

    const message = {
      title: "No rules present",
      details: [
        `There are currently no rules on this stream. Start by adding the rule below`,
        exampleRule,
        ruleMeaning,
      ],
    };

    if (!isLoading) {
      if (rules && rules.length > 0) {
        return rules.map((rule) => (
          <Rule
            key={rule.id}
            data={rule}
            onRuleDelete={(id) => deleteRule(id)}
          />
        ));
      }
    }
  };

  useEffect(() => {
    (async () => {
      dispatch({ type: "change_loading_status", payload: true });

      try {
        const response = await axios.get(rulesURL);
        const { data: payload = [] } = response.data.body;
        dispatch({
          type: "show_rules",
          payload,
        });
      } catch (error) {
        dispatch({ type: "add_errors", payload: [error.response.data] });
      }

      dispatch({ type: "change_loading_status", payload: false });
    })();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => createRule(e)}>
        <div className="ui fluid action input">
          <input
            type="text"
            autoFocus={true}
            value={state.newRule}
            onChange={(e) =>
              dispatch({ type: "rule_changed", payload: e.target.value })
            }
          />
          <button type="submit" className="ui primary button">
            Add Rule
          </button>
        </div>
        {rules()}
      </form>
    </div>
  );
};

export default RuleList;