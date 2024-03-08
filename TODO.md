# Layout
- Revisit Session <-> Climb flow
    - This could probably be different pages in the session manager
    - These should flow into one another pretty naturally    
- 

## Session Layout
- Session should comprise of boulders that have been logged and a capacity to save or clear the session

    The picture I have in my head is "Start New Session" up top, followed by a list of recent sessions and maybe a session explorer in the future

## Profile Screen
- We don't need pictures, so user avatars are kind of pointless
- Should have defaults for some of the climb values:
    - Default discipline: `bouldering`
    - Default grade: `V5`
    - Default terrain: `slab`
    - Default problematic holds: `footchip`
- Should profile be the home of stats? What kind of data analysis would I want to do on this?

# Core Behavior
- Need to start figuring out database writing. While the currently modeled structure is "clean" and "Typescript-y", I can't validate that it actually works because I need to actually set up the hooks. The other thing I'd LIKE to do is guarantee that I know what's actually going on so that abstracting the functions to globally accessible hooks is an easier thing to separate.

- Database writing is underway; I've simplified my abstraction to focus on aligning with the Expo documentation for now. It should be easiest to follow the "Expo" path for now and deviate when necessary.
- I want to figure out how to hydrate the store with the default data that I've inserted into the database. Maybe I can do this manually through the useDB hook?
    - On second thought, this seems like it's not super necessary. The store was useful (and might still be useful) when caching climbs that are associated with a session. Then we can do a bulk write to DB when the session is finished re: climbs.
    - Ideally I am not creating different versions of the same climb when starting a session, so there should be a way to interface with climbs from previous sessions and keep a meta-tracker on the number of times you attempt a climb.
