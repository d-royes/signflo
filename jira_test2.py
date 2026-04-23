import os, urllib.request, base64, json, urllib.parse

env_path = "/Users/droyes/Sign-flo_AG/.env"
env_vars = {}
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and "=" in line:
            k, v = line.split("=", 1)
            env_vars[k.strip()] = v.strip()

email = env_vars.get("JIRA_EMAIL")
token = env_vars.get("JIRA_API_TOKEN")
url = env_vars.get("JIRA_URL")
if url.endswith("/"): url = url[:-1]

auth_str = f"{email}:{token}"
b64_auth = base64.b64encode(auth_str.encode("utf-8")).decode("utf-8")

def get_jira(endpoint):
    req = urllib.request.Request(f"{url}{endpoint}")
    req.add_header("Authorization", f"Basic {b64_auth}")
    req.add_header("Accept", "application/json")
    try:
        response = urllib.request.urlopen(req)
        return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code} for {endpoint}")
        print(e.read().decode("utf-8"))
        return None

def extract_text_from_adf(doc):
    if not doc or type(doc) is not dict:
        return ""
    text = ""
    if doc.get("type") == "text":
        return doc.get("text", "")
    for content in doc.get("content", []):
        text += extract_text_from_adf(content) + " "
    return text.strip()

jql = '"parent" = CPG-176 OR "Epic Link" = CPG-176'
search_endpoint = f"/rest/api/3/search?jql={urllib.parse.quote(jql)}"
print("\nFetching Children...")
children = get_jira(search_endpoint)
if children and 'issues' in children:
    print(f"Found {len(children['issues'])} child issues:\n")
    for issue in children['issues']:
        print(f"--- Child {issue['key']}: {issue['fields']['summary']} ---")
        desc = issue['fields'].get('description', {})
        print(f"Description:\n{extract_text_from_adf(desc)}\n")
